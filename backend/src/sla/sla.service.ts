import { Injectable } from '@nestjs/common';

@Injectable()
export class SlaService {
  calculateDeadline(category: string): Date {
    const hours = {
      roads: 48,
      water: 24,
      sanitation: 36,
      electricity: 72,
    }[category] || 48;
    const deadline = new Date();
    deadline.setHours(deadline.getHours() + hours);
    return deadline;
  }
}
