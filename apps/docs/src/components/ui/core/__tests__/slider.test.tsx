import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Slider } from "../slider";

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("Slider", () => {
  it("renders correctly with label", () => {
    render(<Slider label="Volume" defaultValue={50} />);
    expect(screen.getByText("Volume")).toBeInTheDocument();
    expect(screen.getByRole("slider")).toBeInTheDocument();
    expect(screen.getByRole("slider")).toHaveValue("50");
  });

  it("updates value via keyboard", async () => {
    const user = userEvent.setup();
    render(<Slider label="Brightness" defaultValue={50} />);

    const slider = screen.getByRole("slider");
    await user.click(slider); // Focus
    await user.keyboard("{ArrowRight}");

    expect(slider).toHaveValue("51"); // Default step is usually 1

    await user.keyboard("{ArrowLeft}");
    expect(slider).toHaveValue("50");
  });

  it("renders multiple thumbs for range", () => {
    render(
      <Slider
        label="Range"
        defaultValue={[20, 80]}
        thumbLabels={["Start", "End"]}
      />,
    );
    const sliders = screen.getAllByRole("slider");
    expect(sliders).toHaveLength(2);
    expect(sliders[0]).toHaveValue("20");
    expect(sliders[1]).toHaveValue("80");
    expect(screen.getByLabelText("Start")).toBeInTheDocument();
    expect(screen.getByLabelText("End")).toBeInTheDocument();
  });

  it("supports vertical orientation", () => {
    render(
      <Slider label="Vertical" orientation="vertical" defaultValue={30} />,
    );
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-orientation", "vertical");
  });

  it("displays inline output by default", () => {
    render(<Slider label="Output" defaultValue={42} />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });
});
