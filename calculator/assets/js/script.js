import { normalizeExpression, calculateExpression as calcExpr } from "./calculator.js";

let LAST_RESULT = 0;
var currentExpression = "";

function toggleTheme() {
  const body = document.body;
  const btn = document.getElementById("theme-toggle");

  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    btn.innerHTML = "☀️";
    btn.title = "Switch to light mode";
    localStorage.setItem("theme", "dark");
  } else {
    btn.innerHTML = "🌙";
    btn.title = "Switch to dark mode";
    localStorage.setItem("theme", "light");
  }
}

window.addEventListener("DOMContentLoaded", function () {
  const theme = localStorage.getItem("theme");
  const body = document.body;
  const btn = document.getElementById("theme-toggle");

  if (btn) {
    if (theme === "dark") {
      body.classList.add("dark-mode");
      btn.innerHTML = "☀️";
      btn.title = "Switch to light mode";
    } else {
      btn.innerHTML = "🌙";
      btn.title = "Switch to dark mode";
    }
  }
});

let left = "";
let operator = "";
let right = "";
let steps = [];
const MAX_STEPS = 6;

function appendToResult(value) {
  currentExpression += value.toString();
  updateResult();
}

function bracketToResult(value) {
  currentExpression += value;
  updateResult();
}

function backspace() {
  currentExpression = currentExpression.slice(0, -1);
  updateResult();
}

function operatorToResult(value) {
  if (value === "^") {
    currentExpression += "**";
  } else {
    currentExpression += value;
  }
  updateResult();
}

function clearResult() {
  currentExpression = "";
  updateResult();
}

function percentToResult() {
  if (!currentExpression) return;

  const match = currentExpression.match(/(.+?)(\*\*|[+\-*/^])([0-9.]*)$/);

  if (!match) {
    const num = parseFloat(currentExpression);
    if (isNaN(num)) return;

    currentExpression = (num / 100).toString();
  } else {
    const leftPart = match[1];
    const rightPart = match[3];

    if (!rightPart) return;

    let leftVal;

    try {
      leftVal = eval(leftPart);
    } catch (e) {
      leftVal = parseFloat(leftPart);
    }

    const rightVal = parseFloat(rightPart);
    if (isNaN(leftVal) || isNaN(rightVal)) return;

    const percentVal = (leftVal * rightVal) / 100;

    currentExpression = percentVal.toString();
  }

  currentExpression += "*";

  updateResult();
}

function calculateExpression(expression) {
  return calcExpr(expression, LAST_RESULT);
}

function calculateResult() {
  if (!currentExpression) return;
  const display = document.getElementById("result");
  let result = calculateExpression(currentExpression);
  result = String(result);

  LAST_RESULT = result;

  display.value = result;

  currentExpression = result;
  updateResult();
}

function updateResult() {
  document.getElementById("result").value = currentExpression || "0";
}

window.toggleTheme = toggleTheme;
window.appendToResult = appendToResult;
window.bracketToResult = bracketToResult;
window.backspace = backspace;
window.operatorToResult = operatorToResult;
window.clearResult = clearResult;
window.percentToResult = percentToResult;
window.calculateExpression = calculateExpression;
window.calculateResult = calculateResult;
