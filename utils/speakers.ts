import type { Session } from "@/types/session";
import { timeToMinutes } from "@/utils/schedule-time";

/**
 * The closing panel stores this placeholder in `speaker`. It stands for
 * "everyone", not a person, so it never gets a speaker card.
 */
export const FULL_LINEUP_SPEAKER = "Full speaker lineup";

export interface SpeakerGroup {
  name: string;
  sessions: Session[];
}

/**
 * Groups sessions by speaker name. Speakers are sorted by name and each
 * speaker's sessions by start time. The closing panel's placeholder speaker
 * is left out.
 */
export function groupSessionsBySpeaker(sessions: Session[]): SpeakerGroup[] {
  const byName = new Map<string, Session[]>();

  for (const session of sessions) {
    if (session.speaker === FULL_LINEUP_SPEAKER) continue;

    const existing = byName.get(session.speaker);
    if (existing) {
      existing.push(session);
    } else {
      byName.set(session.speaker, [session]);
    }
  }

  return Array.from(byName, ([name, speakerSessions]) => ({
    name,
    sessions: speakerSessions.sort(
      (a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime),
    ),
  })).sort((a, b) => a.name.localeCompare(b.name));
}
