import { add } from "../lib/calculator";

describe("String Calculator - add function", () => {
  // Empty input
  it("should return 0 for empty string", () => {
    expect(add("")).toBe(0);
  });

  // Single number
  it("should return the number itself for single input", () => {
    expect(add("1")).toBe(1);
  });

  // Multiple numbers with commas
  it("should return sum of numbers separated by commas", () => {
    expect(add("1,5")).toBe(6);
    expect(add("1,2,3,4")).toBe(10);
  });

  // Newlines as delimiters
  it("should handle newlines between numbers", () => {
    expect(add("1\n2,3")).toBe(6);
    expect(add("1\n2\n3")).toBe(6);
    expect(add("1,2\n3,4")).toBe(10);
  });

  // Custom delimiter
  it("should support custom delimiters", () => {
    expect(add("//;\n1;2")).toBe(3);
    expect(add("//|\n4|5|6")).toBe(15);
    expect(add("//.\n2.3.4")).toBe(9);
  });

  // Custom delimiter with newlines in numbers
  it("should handle newlines with custom delimiters", () => {
    expect(add("//;\n1;2\n3")).toBe(6);
  });

  // Negative numbers should throw error
  it("should throw error for single negative number", () => {
    expect(() => add("1,-2,3")).toThrow("negative numbers not allowed -2");
  });

  it("should throw error for multiple negative numbers", () => {
    expect(() => add("//;\n-1;2;-3")).toThrow(
      "negative numbers not allowed -1,-3"
    );
  });

  // Input with undefined delimiter should fail
  it("should return NaN if delimiter is not defined", () => {
    expect(add("1;2")).toBeNaN();
  });

  // No numbers after custom delimiter
  it("should return 0 if no numbers after custom delimiter", () => {
    expect(add("//;\n")).toBe(0);
  });
});
