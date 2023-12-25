import {render, screen} from "@testing-library/react";
import CountDownTimer from "../CountDownTimer";
import MockDate from "mockdate";

beforeEach(() => {
  // MockDate.set("2023-01-01");
});


afterEach(() => {
  MockDate.reset();
});

describe("CountDown component tests", () => {
  test('Renders "Happy New Year" if the date is 1st January', () => {
    MockDate.set("2023-01-01");

    render(<CountDownTimer />);

    const happyNewYearText = screen.getByText(/happy new year!/i);
    expect(happyNewYearText).toBeInTheDocument();
  });

  test('Not renders "Happy New Year" if the date is 1st January', () => {
    render(<CountDownTimer />);

    const happyNewYearText = screen.queryByText(/happy new year!/i);
    expect(happyNewYearText).not.toBeInTheDocument();
  });
});
