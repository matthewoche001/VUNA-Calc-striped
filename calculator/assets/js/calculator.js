function normalizeExpression(expr) {
  return expr
    .replace(/asin\(/g, "asinDeg(")
    .replace(/acos\(/g, "acosDeg(")
    .replace(/atan\(/g, "atanDeg(")
    .replace(/sin\(/g, "sinDeg(")
    .replace(/cos\(/g, "cosDeg(")
    .replace(/tan\(/g, "tanDeg(")
    .replace(/asinh\(/g, "asinh(")
    .replace(/sinh\(/g, "sinh(")
    .replace(/\be\b/g, "Math.E")
    .replace(/\bpi\b/g, "Math.PI");
}

function calculateExpression(expression, lastResult = 0) {
  try {
    let normalizedExpression = normalizeExpression(expression);

    normalizedExpression = normalizedExpression.replace(
      /\bans\b/gi,
      lastResult,
    );

    let result = eval(normalizedExpression);

    if (isNaN(result) || !isFinite(result)) {
      throw new Error();
    }

    return result;
  } catch (e) {
    return "Error";
  }
}

export { normalizeExpression, calculateExpression };
