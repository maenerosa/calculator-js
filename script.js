const numberButtons = document.querySelectorAll(".is-num");
const operatorButtons = document.querySelectorAll(".is-operator");
const clearButton = document.querySelector(".is-clear");
const largeDisplay = document.querySelector(".large-display");
const smallDisplay = document.querySelector(".small-display");
const btnEquals = document.querySelector(".is-equals");
const deleteButton = document.querySelector(".is-delete");
const percentButton = document.querySelector(".is-percent");

let currentInput = "";
let previousInput = "";
let operator = undefined;

function clear() {
  currentInput = "";
  previousInput = "";
  operator = undefined;
}
function del() {
  currentInput = currentInput.toString().slice(0, -1);
}

function updateDisplay() {
  if (currentInput === "" && largeDisplay.value === "") {
    largeDisplay.value = "";
  } else {
    largeDisplay.value = currentInput;
  }

  if (operator !== undefined) {
    smallDisplay.value = previousInput + operator;
  } else {
    smallDisplay.value = "";
  }
}

function chooseOperator(chosenOperator) {
  if (currentInput === "") return;
  if (previousInput !== "") compute();

  operator = chosenOperator;
  previousInput = currentInput;
  currentInput = "";
}
function appendNumber(number) {
  if (number === "." && currentInput.includes(".")) return;
  currentInput = currentInput.toString() + number.toString();
}
function compute() {
  let total = 0;
  const previousNumber = parseFloat(previousInput);
  const currentNumber = parseFloat(currentInput);

  // const calculator = (() => {
  //   const add = (a, b) => a + b;
  //   const sub = (a, b) => a - b;
  //   const mul = (a, b) => a * b;
  //   const div = (a, b) => a / b;

  //   return {
  //     add,
  //     sub,
  //     mul,
  //     div,
  //   };
  // })();

  if (isNaN(previousNumber) || isNaN(currentNumber)) return;
  switch (operator) {
    case "+":
      total = previousNumber + currentNumber;
      break;
    case "−":
      total = previousNumber - currentNumber;
      break;
    case "×":
      total = previousNumber * currentNumber;
      break;
    case "÷":
      total = previousNumber / currentNumber;
      break;

    default:
      return "";
  }

  currentInput = total;
  previousInput = "";
  operator = undefined;
}

numberButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    if (largeDisplay.value === "" && event.target.textContent === "0") return;

    appendNumber(event.target.textContent);
    updateDisplay();
  });
});

clearButton.addEventListener("click", () => {
  clear();
  updateDisplay();
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    chooseOperator(event.target.textContent);
    updateDisplay();
  });
});

btnEquals.addEventListener("click", () => {
  compute();
  updateDisplay();
});

deleteButton.addEventListener("click", () => {
  del();
  updateDisplay();
});

percentButton.addEventListener("click", () => {
  compute();
  updateDisplay();
});
