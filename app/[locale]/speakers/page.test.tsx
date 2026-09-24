import { beforeEach, describe, expect, it, vi } from "vitest";

import { render, screen } from "@/tests/utils/render";
import type { Session } from "@/types/session";

import SpeakersPage from "./page";

const { fetchSessions } = vi.hoisted(() => ({
  fetchSessions: vi.fn<() => Promise<Session[]>>(),
}));

// The service talks to Supabase behind a cache directive, so it is the one
// thing to replace; the grouping util and the card run for real.
vi.mock("@/services/sessions", () => ({ fetchSessions }));

function session(overrides: Partial<Session>): Session {
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

describe("SpeakersPage", () => {
  beforeEach(() => {
    fetchSessions.mockReset();
  });

  it("shows one card per speaker and none for the closing panel", async () => {
    fetchSessions.mockResolvedValue([
      session({ id: "keynote", speaker: "Marta Fernandez" }),
      session({ id: "rsc", speaker: "Iker Otxoa" }),
      session({ id: "closing-panel", speaker: "Full speaker lineup" }),
    ]);

    render(await SpeakersPage());

    expect(
      screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent),
    ).toEqual(["Iker Otxoa", "Marta Fernandez"]);
    expect(screen.queryByText("Full speaker lineup")).not.toBeInTheDocument();
    expect(
      screen.queryByText("No speakers announced yet."),
    ).not.toBeInTheDocument();
  });

  it("says so when there are no speakers yet", async () => {
    fetchSessions.mockResolvedValue([]);

    render(await SpeakersPage());

    expect(
      screen.getByRole("heading", { level: 1, name: "Speakers" }),
    ).toBeInTheDocument();
    expect(screen.getByText("No speakers announced yet.")).toBeInTheDocument();
    expect(screen.queryAllByRole("heading", { level: 2 })).toHaveLength(0);
  });
});
