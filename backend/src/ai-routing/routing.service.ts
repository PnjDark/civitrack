import { Injectable } from '@nestjs/common';

@Injectable()
export class RoutingService {
  classify(text: string): string {
    const lower = text.toLowerCase();
    if (lower.includes('road') || lower.includes('pothole') || lower.includes('bridge') || lower.includes('sinkhole')) return 'roads';
    if (lower.includes('water') || lower.includes('pipe') || lower.includes('tap') || lower.includes('no water')) return 'water';
    if (lower.includes('garbage') || lower.includes('dump') || lower.includes('waste') || lower.includes('sanitation')) return 'sanitation';
    if (lower.includes('electricity') || lower.includes('power') || lower.includes('outage') || lower.includes('light')) return 'electricity';
    return 'roads'; // default
  }
}