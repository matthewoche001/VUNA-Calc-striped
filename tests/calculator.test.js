import { normalizeExpression, calculateExpression } from "../assets/js/calculator.js";

describe("normalizeExpression", () => {
  it("leaves plain arithmetic unchanged", () => {
    expect(normalizeExpression("2+2")).toBe("2+2");
    expect(normalizeExpression("10/2")).toBe("10/2");
    expect(normalizeExpression("3*4-1")).toBe("3*4-1");
  });

  it("replaces pi with Math.PI", () => {
    expect(normalizeExpression("pi")).toBe("Math.PI");
    expect(normalizeExpression("2*pi")).toBe("2*Math.PI");
  });

  it("replaces e with Math.E", () => {
    expect(normalizeExpression("e")).toBe("Math.E");
    expect(normalizeExpression("2*e")).toBe("2*Math.E");
  });

  it("replaces sin( with sinDeg(", () => {
    expect(normalizeExpression("sin(30)")).toBe("sinDeg(30)");
  });

  it("replaces cos( with cosDeg(", () => {
    expect(normalizeExpression("cos(60)")).toBe("cosDeg(60)");
  });

  it("replaces tan( with tanDeg(", () => {
    expect(normalizeExpression("tan(45)")).toBe("tanDeg(45)");
  });

  it("replaces asin( with asinDeg(", () => {
    expect(normalizeExpression("asin(0.5)")).toBe("asinDeg(0.5)");
  });

  it("replaces acos( with acosDeg(", () => {
    expect(normalizeExpression("acos(0.5)")).toBe("acosDeg(0.5)");
  });

  it("replaces atan( with atanDeg(", () => {
    expect(normalizeExpression("atan(1)")).toBe("atanDeg(1)");
  });

  it("leaves asinh( unchanged", () => {
    expect(normalizeExpression("asinh(1)")).toBe("asinh(1)");
  });

  it("leaves sinh( unchanged", () => {
    expect(normalizeExpression("sinh(1)")).toBe("sinh(1)");
  });

  it("handles multiple trig functions", () => {
    const result = normalizeExpression("sin(30)+cos(60)");
    expect(result).toBe("sinDeg(30)+cosDeg(60)");
  });

  it("handles mixed constants and functions", () => {
    const result = normalizeExpression("pi*sin(90)");
    expect(result).toBe("Math.PI*sinDeg(90)");
  });
});

describe("calculateExpression", () => {
  it("adds two numbers", () => {
    expect(calculateExpression("2+3")).toBe(5);
  });

  it("subtracts two numbers", () => {
    expect(calculateExpression("10-4")).toBe(6);
  });

  it("multiplies two numbers", () => {
    expect(calculateExpression("3*7")).toBe(21);
  });

  it("divides two numbers", () => {
    expect(calculateExpression("20/4")).toBe(5);
  });

  it("handles operator precedence", () => {
    expect(calculateExpression("2+3*4")).toBe(14);
  });

  it("handles parentheses", () => {
    expect(calculateExpression("(2+3)*4")).toBe(20);
  });

  it("handles power operator", () => {
    expect(calculateExpression("2**3")).toBe(8);
  });

  it("handles decimal numbers", () => {
    expect(calculateExpression("3.5+2.1")).toBeCloseTo(5.6);
  });

  it("handles negative numbers", () => {
    expect(calculateExpression("-5+3")).toBe(-2);
  });

  it("replaces ans with lastResult", () => {
    expect(calculateExpression("ans+2", 5)).toBe(7);
  });

  it("replaces ans with lastResult (uppercase)", () => {
    expect(calculateExpression("ANS+2", 5)).toBe(7);
  });

  it("uses default lastResult of 0 when ans is used without lastResult", () => {
    expect(calculateExpression("ans+2")).toBe(2);
  });

  it("uses pi constant", () => {
    expect(calculateExpression("pi")).toBeCloseTo(Math.PI);
  });

  it("uses e constant", () => {
    expect(calculateExpression("e")).toBeCloseTo(Math.E);
  });

  it("returns Error for division by zero", () => {
    expect(calculateExpression("1/0")).toBe("Error");
  });

  it("returns Error for invalid expression", () => {
    expect(calculateExpression("2+")).toBe("Error");
  });

  it("returns Error for undefined variables", () => {
    expect(calculateExpression("x+1")).toBe("Error");
  });

  it("returns Error for empty expression", () => {
    expect(calculateExpression("")).toBe("Error");
  });

  it("returns Error for trig functions (sinDeg is undefined)", () => {
    expect(calculateExpression("sin(30)")).toBe("Error");
  });
});
