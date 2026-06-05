// In-memory data store that powers the clickable demo.
// State mutations (RSVP, check-in, bookings, etc.) live here and persist for the
// lifetime of the server process. On Vercel serverless this resets per cold start,
// which is acceptable for a demo.
//
// TODO: Replace these accessors with Prisma queries (see src/lib/prisma.ts) when a
// live PostgreSQL database is configured.
import {
  CURRENT_USER_ID,
  badges,
  competencies,
  credentials,
  events as seedEvents,
  initialCheckInEventIds,
  initialRsvpEventIds,
  interviewSlots as seedSlots,
  leaderboardUserIds,
  mentorshipOpportunities,
  organizations,
  pathways,
  portfolioItems as seedPortfolio,
  studentProfiles,
  transcriptEntries as seedTranscript,
  userBadges,
  userCompetencyProgress,
  userCredentials as seedUserCredentials,
  userPathwayProgress,
  users,
  xpTransactions as seedXp,
} from "./seed-data";
import type {
  CheckInMethod,
  CredentialStatus,
  EventItem,
  InterviewSlot,
  PortfolioItem,
  TranscriptEntry,
  UserCredential,
  XpTransaction,
} from "@/lib/types";

interface MutableState {
  events: EventItem[];
  slots: InterviewSlot[];
  rsvpEventIds: Set<string>;
  checkInEventIds: Set<string>;
  reflections: { id: string; eventId: string; content: string; createdAt: string }[];
  bookedSlotIds: Set<string>;
  appliedOpportunityIds: Set<string>;
  userCredentials: UserCredential[];
  portfolio: PortfolioItem[];
  transcript: TranscriptEntry[];
  xp: XpTransaction[];
  adminEvents: EventItem[];
  lastSyncAt: string;
}

// Use a global singleton so Next.js dev hot-reload doesn't wipe state.
const globalForStore = globalThis as unknown as { __tshStore?: MutableState };

function createState(): MutableState {
  return {
    events: seedEvents.map((e) => ({ ...e })),
    slots: seedSlots.map((s) => ({ ...s })),
    rsvpEventIds: new Set(initialRsvpEventIds),
    checkInEventIds: new Set(initialCheckInEventIds),
    reflections: [],
    bookedSlotIds: new Set(),
    appliedOpportunityIds: new Set(),
    userCredentials: seedUserCredentials.map((c) => ({ ...c })),
    portfolio: seedPortfolio.map((p) => ({ ...p })),
    transcript: seedTranscript.map((t) => ({ ...t })),
    xp: seedXp.map((x) => ({ ...x })),
    adminEvents: [],
    lastSyncAt: new Date().toISOString(),
  };
}

const state: MutableState = globalForStore.__tshStore ?? createState();
if (process.env.NODE_ENV !== "production") globalForStore.__tshStore = state;

// --- Read accessors -------------------------------------------------------

export const store = {
  currentUserId: CURRENT_USER_ID,

  getUser: (id: string) => users.find((u) => u.id === id),
  getCurrentUser: () => users.find((u) => u.id === CURRENT_USER_ID)!,
  getProfile: (id: string) => studentProfiles.find((p) => p.userId === id),
  getUsers: () => users,

  getOrganizations: () => organizations,
  getOrganization: (slug: string) => organizations.find((o) => o.slug === slug),

  getEvents: () => [...state.events, ...state.adminEvents],
  getEvent: (id: string) =>
    [...state.events, ...state.adminEvents].find((e) => e.id === id),

  getBadges: () => badges,
  getUserBadges: () => userBadges,
  getBadge: (id: string) => badges.find((b) => b.id === id),

  getPathways: () => pathways,
  getPathway: (slug: string) => pathways.find((p) => p.slug === slug),
  getPathwayProgress: () => userPathwayProgress,

  getCompetencies: () => competencies,
  getCompetencyProgress: () => userCompetencyProgress,

  getCredentials: () => credentials,
  getUserCredentials: () => state.userCredentials,

  getPortfolio: () => state.portfolio,

  getMentorshipOpportunities: () => mentorshipOpportunities,
  isAppliedTo: (oppId: string) => state.appliedOpportunityIds.has(oppId),

  getInterviewSlots: () => state.slots,
  isSlotBooked: (slotId: string) => state.bookedSlotIds.has(slotId),
  getBookedSlots: () => state.slots.filter((s) => state.bookedSlotIds.has(s.id)),

  getTranscript: () => state.transcript,
  getXp: () => state.xp,
  getLeaderboardUserIds: () => leaderboardUserIds,

  // RSVP / check-in state
  hasRsvp: (eventId: string) => state.rsvpEventIds.has(eventId),
  hasCheckedIn: (eventId: string) => state.checkInEventIds.has(eventId),
  getRsvpEvents: () =>
    [...state.events, ...state.adminEvents].filter((e) =>
      state.rsvpEventIds.has(e.id),
    ),
  getReflections: (eventId: string) =>
    state.reflections.filter((r) => r.eventId === eventId),

  getLastSyncAt: () => state.lastSyncAt,
};

// --- Mutations ------------------------------------------------------------

function addXp(amount: number, reason: string) {
  state.xp.unshift({
    id: `x-${Date.now()}`,
    userId: CURRENT_USER_ID,
    amount,
    reason,
    createdAt: new Date().toISOString(),
  });
}

export const mutations = {
  toggleRsvp(eventId: string): { rsvped: boolean } {
    const event = store.getEvent(eventId);
    if (!event) throw new Error("Event not found");
    if (state.rsvpEventIds.has(eventId)) {
      state.rsvpEventIds.delete(eventId);
      event.rsvpCount = Math.max(0, event.rsvpCount - 1);
      return { rsvped: false };
    }
    state.rsvpEventIds.add(eventId);
    event.rsvpCount += 1;
    return { rsvped: true };
  },

  checkIn(eventId: string, method: CheckInMethod): { xpAwarded: number } {
    const event = store.getEvent(eventId);
    if (!event) throw new Error("Event not found");
    if (state.checkInEventIds.has(eventId)) return { xpAwarded: 0 };
    state.checkInEventIds.add(eventId);
    addXp(event.xpReward, `Checked in: ${event.title}`);
    state.transcript.unshift({
      id: `t-${Date.now()}`,
      userId: CURRENT_USER_ID,
      category: "EVENT",
      title: event.title,
      detail: `Checked in via ${method.toLowerCase()}.`,
      hours: 1,
      occurredAt: new Date().toISOString(),
    });
    return { xpAwarded: event.xpReward };
  },

  addReflection(eventId: string, content: string) {
    const reflection = {
      id: `r-${Date.now()}`,
      eventId,
      content,
      createdAt: new Date().toISOString(),
    };
    state.reflections.unshift(reflection);
    addXp(20, "Reflection submitted");
    return reflection;
  },

  setCredentialStatus(credentialId: string, status: CredentialStatus) {
    const existing = state.userCredentials.find((c) => c.credentialId === credentialId);
    if (existing) existing.status = status;
    else state.userCredentials.push({ credentialId, status });
    return { credentialId, status };
  },

  bookSlot(slotId: string) {
    const slot = state.slots.find((s) => s.id === slotId);
    if (!slot) throw new Error("Slot not found");
    slot.isBooked = true;
    state.bookedSlotIds.add(slotId);
    addXp(50, "Booked a mock interview");
    return { booked: true };
  },

  applyToOpportunity(oppId: string, message?: string) {
    state.appliedOpportunityIds.add(oppId);
    addXp(30, "Applied to mentorship opportunity");
    return { applied: true, message };
  },

  addPortfolioItem(item: Omit<PortfolioItem, "id" | "userId">) {
    const created: PortfolioItem = {
      ...item,
      id: `pf-${Date.now()}`,
      userId: CURRENT_USER_ID,
    };
    state.portfolio.unshift(created);
    return created;
  },

  createAdminEvent(input: Partial<EventItem> & { title: string }) {
    const created: EventItem = {
      id: `e-admin-${Date.now()}`,
      title: input.title,
      description: input.description ?? "Demo event created from the org admin tools.",
      category: input.category ?? "CLUB_MEETING",
      startsAt: input.startsAt ?? new Date().toISOString(),
      endsAt: input.endsAt ?? new Date(Date.now() + 3600000).toISOString(),
      location: input.location ?? "TBD",
      isRemote: input.isRemote ?? false,
      capacity: input.capacity ?? 50,
      rsvpCount: 0,
      xpReward: input.xpReward ?? 50,
      isCsmSpecific: true,
      orgId: input.orgId ?? "org-acm",
      competencyTag: input.competencyTag,
      badgeIds: [],
    };
    state.adminEvents.unshift(created);
    return created;
  },
};
