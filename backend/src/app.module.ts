import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ComplaintsModule } from './complaints/complaints.module';
import { UsersModule } from './users/users.module';
import { AiRoutingModule } from './ai-routing/ai-routing.module';
import { SlaModule } from './sla/sla.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    AuthModule,
    ComplaintsModule,
    UsersModule,
    AiRoutingModule,
    SlaModule,
    PrismaModule,
  ],
})
export class AppModule {}

