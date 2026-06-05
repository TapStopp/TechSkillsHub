// Suitable REST API integration layer (MOCK MODE).
//
// These functions simulate the Suitable platform's REST API. For now they read
// from the local mock data store. When real Suitable credentials are available,
// replace the mock branches with authenticated `fetch` calls.
//
// TODO (real integration), for each function below:
//   - Build the request URL from `SUITABLE_API_BASE_URL`.
//   - Attach auth: `Authorization: Bearer <OAuth/SSO token>` using `SUITABLE_API_KEY`
//     or an exchanged SSO token.
//   - Handle pagination (cursor/offset), rate limits, retries, and timeouts.
//   - Map Suitable's response shapes to our domain types.
//   - Surface typed errors instead of throwing raw fetch errors.
import { store } from "@/lib/data/store";
import type {
  Badge,
  EventItem,
  Pathway,
  TranscriptEntry,
  UserCompetencyProgress,
} from "@/lib/types";

const BASE_URL = process.env.SUITABLE_API_BASE_URL ?? "https://api.suitable.co";
const MOCK_MODE = process.env.SUITABLE_MOCK_MODE !== "false";

/** Whether the Suitable client is running against mock data. */
export function isSuitableMockMode(): boolean {
  return MOCK_MODE;
}

export function getSuitableConfig() {
  return {
    baseUrl: BASE_URL,
    mockMode: MOCK_MODE,
    lastSyncAt: store.getLastSyncAt(),
  };
}

// Simulate network latency so loading states are demonstrable.
async function simulateLatency<T>(value: T, ms = 250): Promise<T> {
  if (!MOCK_MODE) return value;
  await new Promise((r) => setTimeout(r, ms));
  return value;
}

export async function getSuitableEvents(): Promise<EventItem[]> {
  // TODO: GET `${BASE_URL}/v1/events` with auth + pagination.
  return simulateLatency(store.getEvents());
}

export async function getSuitableBadges(_studentId: string): Promise<Badge[]> {
  // TODO: GET `${BASE_URL}/v1/students/${_studentId}/badges`.
  return simulateLatency(store.getBadges());
}

export async function getSuitablePathways(_studentId: string): Promise<Pathway[]> {
  // TODO: GET `${BASE_URL}/v1/students/${_studentId}/pathways`.
  return simulateLatency(store.getPathways());
}

export async function getSuitableLeaderboard(): Promise<
  { userId: string; totalXp: number; rank: number }[]
> {
  // TODO: GET `${BASE_URL}/v1/leaderboard`.
  const ranked = store
    .getLeaderboardUserIds()
    .map((userId, i) => ({
      userId,
      totalXp: store.getProfile(userId)?.totalXp ?? 0,
      rank: i + 1,
    }));
  return simulateLatency(ranked);
}

export async function getSuitableTranscript(
  _studentId: string,
): Promise<TranscriptEntry[]> {
  // TODO: GET `${BASE_URL}/v1/students/${_studentId}/transcript`.
  return simulateLatency(store.getTranscript());
}

export async function getSuitableCompetencies(
  _studentId: string,
): Promise<UserCompetencyProgress[]> {
  // TODO: GET `${BASE_URL}/v1/students/${_studentId}/competencies`.
  return simulateLatency(store.getCompetencyProgress());
}

export async function submitSuitableReflection(
  activityId: string,
  _studentId: string,
  reflection: string,
) {
  // TODO: POST `${BASE_URL}/v1/activities/${activityId}/reflections`.
  return simulateLatency({ ok: true, activityId, reflection });
}

export async function checkInToSuitableEvent(
  eventId: string,
  _studentId: string,
  method: string,
) {
  // TODO: POST `${BASE_URL}/v1/events/${eventId}/check-in`.
  return simulateLatency({ ok: true, eventId, method });
}

export async function rsvpToSuitableEvent(eventId: string, _studentId: string) {
  // TODO: POST `${BASE_URL}/v1/events/${eventId}/rsvp`.
  return simulateLatency({ ok: true, eventId });
}
