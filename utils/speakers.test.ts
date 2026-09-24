import { describe, expect, it } from "vitest";

import type { Session } from "@/types/session";

import { FULL_LINEUP_SPEAKER, groupSessionsBySpeaker } from "./speakers";

function session(overrides: Partial<Session> = {}): Session {
  return {
    id: "a-session",
    title: "A session",
    speaker: "A speaker",
    track: "React",
    room: "Main Hall",
    startTime: "09:00",
    durationMinutes: 45,
    description: "",
    ...overrides,
  };
}

describe("groupSessionsBySpeaker", () => {
  it("gives each speaker one entry holding all of their sessions", () => {
    const first = session({ id: "first", speaker: "Marta Fernandez" });
    const second = session({
      id: "second",
      speaker: "Marta Fernandez",
      startTime: "16:00",
    });
    const other = session({ id: "other", speaker: "Iker Otxoa" });

    const groups = groupSessionsBySpeaker([first, other, second]);

    expect(groups).toEqual([
      { name: "Iker Otxoa", sessions: [other] },
      { name: "Marta Fernandez", sessions: [first, second] },
    ]);
  });

  it("sorts speakers by name", () => {
    const groups = groupSessionsBySpeaker([
      session({ id: "a", speaker: "Sofia Almeida" }),
      session({ id: "b", speaker: "Diego Castellanos" }),
      session({ id: "c", speaker: "Naia Etxeberria" }),
    ]);

    expect(groups.map((group) => group.name)).toEqual([
      "Diego Castellanos",
      "Naia Etxeberria",
      "Sofia Almeida",
    ]);
  });

  it("sorts a speaker's sessions by start time", () => {
    const groups = groupSessionsBySpeaker([
      session({ id: "afternoon", speaker: "Marta", startTime: "14:00" }),
      session({ id: "morning", speaker: "Marta", startTime: "09:30" }),
    ]);

    expect(groups[0].sessions.map((s) => s.id)).toEqual([
      "morning",
      "afternoon",
    ]);
  });

  it("leaves out the closing panel's placeholder speaker", () => {
    const groups = groupSessionsBySpeaker([
      session({ id: "keynote", speaker: "Marta Fernandez" }),
      session({ id: "closing-panel", speaker: FULL_LINEUP_SPEAKER }),
    ]);

    expect(groups.map((group) => group.name)).toEqual(["Marta Fernandez"]);
  });

  it("returns nothing for no sessions", () => {
    expect(groupSessionsBySpeaker([])).toEqual([]);
  });
});
