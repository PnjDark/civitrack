import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RoutingService } from '../ai-routing/routing.service';
import { SlaService } from '../sla/sla.service';

@Injectable()
export class ComplaintsService {
  constructor(
    private prisma: PrismaService,
    private routing: RoutingService,
    private sla: SlaService,
  ) {}

  async create(data: { title: string; description: string; location: any; citizenId: string }) {
    const category = this.routing.classify(data.title + ' ' + data.description);
    const slaDeadline = this.sla.calculateDeadline(category);
    const complaint = await this.prisma.complaint.create({
      data: {
        title: data.title,
        description: data.description,
        location: data.location,
        category,
        status: 'PENDING',
        citizenId: data.citizenId,
        slaDeadline,
      },
    });
    // Log event
    await this.prisma.statusEvent.create({
      data: {
        complaintId: complaint.id,
        oldStatus: 'PENDING',
        newStatus: 'PENDING',
        changedBy: data.citizenId,
      },
    });
    return complaint;
  }

  async findAllByCitizen(citizenId: string) {
    return this.prisma.complaint.findMany({ where: { citizenId }, orderBy: { createdAt: 'desc' } });
  }

  async findAllByDepartment(department: string) {
    return this.prisma.complaint.findMany({ where: { category: department }, orderBy: { createdAt: 'desc' } });
  }

  async updateStatus(complaintId: string, newStatus: string, userId: string) {
    const old = await this.prisma.complaint.findUnique({ where: { id: complaintId } });
    const updated = await this.prisma.complaint.update({
      where: { id: complaintId },
      data: { status: newStatus as any },
    });
    await this.prisma.statusEvent.create({
      data: {
        complaintId,
        oldStatus: old.status,
        newStatus: newStatus as any,
        changedBy: userId,
      },
    });
    return updated;
  }

  async getBreachedSlas() {
    const now = new Date();
    return this.prisma.complaint.findMany({
      where: {
        slaDeadline: { lt: now },
        status: { not: 'RESOLVED' },
      },
    });
  }
}