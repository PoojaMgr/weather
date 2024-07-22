import { fireEvent, render, screen } from "@testing-library/react";
import InputField from "../InputField";

const mockedSetFunc = jest.fn();

describe("InputField", () => {
  it("render InputField", () => {
    render(<InputField setCityFromInputFields={mockedSetFunc} />);
    const placeHolder = screen.getByPlaceholderText(/Search for location/i);
    expect(placeHolder).toBeInTheDocument();
  });
  it("check onchange", () => {
    render(<InputField setCityFromInputFields={mockedSetFunc} />);
    const inputElement = screen.getByPlaceholderText(/Search for location/i);
    fireEvent.change(inputElement, { target: { value: "Noida" } });
    expect(inputElement.value).toBe("Noida");
  });
});
