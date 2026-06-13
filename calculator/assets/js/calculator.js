const TRIG_DEFS = `
function sinDeg(d){return Math.sin(d*Math.PI/180)}
function cosDeg(d){return Math.cos(d*Math.PI/180)}
function tanDeg(d){return Math.tan(d*Math.PI/180)}
function asinDeg(x){return Math.asin(x)*180/Math.PI}
function acosDeg(x){return Math.acos(x)*180/Math.PI}
function atanDeg(x){return Math.atan(x)*180/Math.PI}
`;

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

    let result = eval(TRIG_DEFS + normalizedExpression);

    if (isNaN(result) || !isFinite(result)) {
      throw new Error();
    }

    return result;
  } catch (e) {
    return "Error";
  }
}

export { normalizeExpression, calculateExpression };
