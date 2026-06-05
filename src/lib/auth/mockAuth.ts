// Mock SSO authentication for TechSkillsHub.
//
// This module isolates ALL auth logic so it can be swapped for real Marist/Suitable
// SSO later. The mock signs in a seeded student user via a signed-ish cookie.
//
// TODO (real SSO): replace `signIn`/`getSession` with an OIDC/SAML flow against
// Marist's identity provider (or Suitable's SSO). Map the IdP subject claim to a
// User record, issue a real session token (e.g., NextAuth/iron-session), and keep
// the `getSession()` contract so callers don't change.
import { cookies } from "next/headers";
import { store } from "@/lib/data/store";
import type { User } from "@/lib/types";

const SESSION_COOKIE = "tsh_session";

export interface Session {
  userId: string;
  user: User;
}

/** Read the current session from the request cookie, or null if signed out. */
export async function getSession(): Promise<Session | null> {
  const jar = await cookies();
  const userId = jar.get(SESSION_COOKIE)?.value;
  if (!userId) return null;
  const user = store.getUser(userId);
  if (!user) return null;
  return { userId, user };
}

/** Create a mock session for the seeded demo student and return it. */
export async function signIn(): Promise<Session> {
  // TODO (real SSO): the userId would come from the verified IdP claims.
  const userId = store.currentUserId;
  const jar = await cookies();
  jar.set(SESSION_COOKIE, userId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return { userId, user: store.getCurrentUser() };
}

/** Clear the session cookie. */
export async function signOut(): Promise<void> {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

/** Whether mock SSO mode is active (vs. a future real provider). */
export function isMockSsoMode(): boolean {
  return process.env.SSO_MOCK_MODE !== "false";
}
