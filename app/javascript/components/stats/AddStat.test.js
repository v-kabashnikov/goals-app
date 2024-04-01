/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddStat from "./AddStat";

describe("AddStat Component", () => {
  beforeAll(() => {
    jest.useFakeTimers("modern");
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("renders 'Add Progress' button when tracking is allowed", () => {
    const lastTrackedAt = new Date("2021-01-01T12:00:00Z");
    const props = {
      goalId: "1",
      lastTrackedAt: lastTrackedAt.toISOString(),
      trackingInterval: "daily",
      onUpdate: jest.fn(),
    };

    jest.setSystemTime(new Date("2021-01-02T12:00:00Z"));

    const { container } = render(<AddStat {...props} />);
    const addIcon = container.querySelector(".bi-plus-circle");
    expect(addIcon).toBeInTheDocument();
  });

  it("displays waiting time equal to interval if was tracked just now", () => {
    const lastTrackedAt = new Date();
    const props = {
      goalId: "1",
      lastTrackedAt: lastTrackedAt.toISOString(),
      trackingInterval: "weekly",
      onUpdate: jest.fn(),
    };

    jest.setSystemTime(lastTrackedAt);

    const { container } = render(<AddStat {...props} />);
    const timeLeftDiv = container.querySelector("#timeLeft");
    expect(timeLeftDiv).toBeInTheDocument();
    expect(timeLeftDiv.textContent).toBe(
      "168 hours and 0 minutes until next track"
    );
  });

  it("displays waiting time if was tracked recently", () => {
    const lastTrackedAt = new Date("2021-01-02T12:00:00Z");
    const props = {
      goalId: "1",
      lastTrackedAt: lastTrackedAt.toISOString(),
      trackingInterval: "daily",
      onUpdate: jest.fn(),
    };

    // current time is 14 hours and 15 minutes after the last tracked time.
    jest.setSystemTime(new Date("2021-01-03T02:15:00Z"));

    const { container } = render(<AddStat {...props} />);
    const timeLeftDiv = container.querySelector("#timeLeft");
    expect(timeLeftDiv).toBeInTheDocument();
    expect(timeLeftDiv.textContent).toBe(
      "9 hours and 45 minutes until next track"
    );
  });
});
