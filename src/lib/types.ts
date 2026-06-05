// Shared domain types for TechSkillsHub.
// These mirror the Prisma models but are used by the mock data layer so the demo
// runs without a live database. TODO: when wiring real DB, import Prisma types instead.

export type UserRole =
  | "STUDENT"
  | "FACULTY"
  | "ALUMNI"
  | "INDUSTRY_PARTNER"
  | "ADMIN"
  | "ORG_LEADER";

export type EventCategory =
  | "WORKSHOP"
  | "CAREER_FAIR"
  | "TECH_TALK"
  | "HACKATHON"
  | "CLUB_MEETING"
  | "INTERVIEW_PREP"
  | "NETWORKING"
  | "SERVICE"
  | "SOCIAL";

export type RsvpStatus = "GOING" | "WAITLIST" | "CANCELLED";
export type CheckInMethod = "QR" | "MOBILE" | "REMOTE" | "MANUAL";
export type CredentialStatus = "SAVED" | "PLANNED" | "IN_PROGRESS" | "COMPLETED";
export type ProgressStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
export type MentorshipKind =
  | "RESEARCH"
  | "INTERNSHIP"
  | "PORTFOLIO_REVIEW"
  | "CAREER_GUIDANCE"
  | "MOCK_INTERVIEW";
export type ApplicationStatus = "APPLIED" | "ACCEPTED" | "DECLINED" | "MATCHED";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarColor: string;
  title?: string;
  company?: string;
}

export interface StudentProfile {
  userId: string;
  major: string;
  gradYear: number;
  careerTrack: string;
  interests: string[];
  summary: string;
  totalXp: number;
  serviceHours: number;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  logoColor: string;
  memberCount: number;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  startsAt: string;
  endsAt: string;
  location: string;
  isRemote: boolean;
  capacity: number;
  rsvpCount: number;
  xpReward: number;
  isCsmSpecific: boolean;
  orgId?: string;
  competencyTag?: string;
  badgeIds: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  tier: "bronze" | "silver" | "gold" | "platinum";
  xpValue: number;
}

export interface UserBadge {
  badgeId: string;
  earnedAt: string;
  progress: number; // percent (100 = earned)
}

export interface Pathway {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  estimatedHours: number;
  steps: { id: string; title: string; detail: string; order: number }[];
}

export interface UserPathwayProgress {
  pathwayId: string;
  status: ProgressStatus;
  completedSteps: number;
}

export interface Competency {
  id: string;
  name: string;
  framework: "NACE" | "CSM";
  description: string;
  category: string;
}

export interface UserCompetencyProgress {
  competencyId: string;
  level: number;
  percent: number;
}

export interface Credential {
  id: string;
  name: string;
  provider: string;
  careerTrack: string;
  major: string;
  cost: string;
  difficulty: string;
  duration: string;
  modality: string;
  description: string;
  url?: string;
}

export interface UserCredential {
  credentialId: string;
  status: CredentialStatus;
}

export interface PortfolioItem {
  id: string;
  userId: string;
  title: string;
  type: "PROJECT" | "FILE" | "LINK" | "GITHUB" | "LINKEDIN";
  url?: string;
  description: string;
  isPublic: boolean;
}

export interface MentorshipOpportunity {
  id: string;
  mentorId: string;
  kind: MentorshipKind;
  title: string;
  description: string;
  careerTrack: string;
  expertise: string[];
  availability: string;
  isOpen: boolean;
}

export interface MentorshipApplication {
  id: string;
  userId: string;
  opportunityId: string;
  status: ApplicationStatus;
  message?: string;
}

export interface InterviewSlot {
  id: string;
  interviewerId: string;
  topic: string;
  startsAt: string;
  durationMin: number;
  modality: string;
  isBooked: boolean;
}

export interface InterviewBooking {
  id: string;
  userId: string;
  slotId: string;
}

export interface TranscriptEntry {
  id: string;
  userId: string;
  category: "EVENT" | "LEADERSHIP" | "SERVICE" | "CREDENTIAL" | "BADGE";
  title: string;
  detail: string;
  hours: number;
  occurredAt: string;
}

export interface XpTransaction {
  id: string;
  userId: string;
  amount: number;
  reason: string;
  createdAt: string;
}
