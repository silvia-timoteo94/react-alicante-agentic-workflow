import { describe, expect, it } from "vitest";

import { render, screen } from "@/tests/utils/render";

import { SpeakerCard } from "./speaker-card";

const sessions = [
  { id: "opening-keynote", title: "Opening Keynote", startTime: "09:00" },
  { id: "closing-talk", title: "A Closing Talk", startTime: "16:00" },
];

function renderCard() {
  // The card is a list item, so it needs a list around it.
  return render(
    <ul>
      <SpeakerCard name="Marta Fernandez" sessions={sessions} />
    </ul>,
  );
}

describe("SpeakerCard", () => {
  it("shows the speaker's name as a heading", () => {
    renderCard();

    expect(
      screen.getByRole("heading", { level: 2, name: "Marta Fernandez" }),
    ).toBeInTheDocument();
  });

  it("lists each session with its start time and title", () => {
    renderCard();

    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByText("09:00")).toBeInTheDocument();
    expect(screen.getByText("Opening Keynote")).toBeInTheDocument();
    expect(screen.getByText("16:00")).toBeInTheDocument();
    expect(screen.getByText("A Closing Talk")).toBeInTheDocument();
  });

  it("links each session to its session page", () => {
    renderCard();

    expect(
      screen.getByRole("link", { name: /Opening Keynote/ }),
    ).toHaveAttribute("href", "/en/sessions/opening-keynote");
    expect(
      screen.getByRole("link", { name: /A Closing Talk/ }),
    ).toHaveAttribute("href", "/en/sessions/closing-talk");
  });
});
