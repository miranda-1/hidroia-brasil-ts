export interface Discipline {
  id: string;
  name: string;
  summary: string;
  topics: string[];
  badge: string;
  badgeColor: string;
  iconName: string;
  targetRoute?: string;
  applicationText?: string;
  visualIndication?: string;
}
