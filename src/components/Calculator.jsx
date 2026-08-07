import { useState } from "react";
import Button from "./Button";
import Display from "./Display";

// Safe calculator function — no eval()
const calculateExpression = (expression) => {
  // Allow only numbers, decimal points and operators
  if (!/^[0-9+\-*/.]+$/.test(expression)) {
    throw new Error("Invalid expression");
  }

  const tokens = expression.match(/(\d+\.?\d*|[+\-*/])/g);

  if (!tokens || tokens.length === 0) {
    throw new Error("Invalid expression");
  }

  let result = Number(tokens[0]);

  if (Number.isNaN(result)) {
    throw new Error("Invalid number");
  }

  for (let i = 1; i < tokens.length; i += 2) {
    const operator = tokens[i];
    const number = Number(tokens[i + 1]);

    if (Number.isNaN(number)) {
      throw new Error("Invalid number");
    }

    switch (operator) {
      case "+":
        result += number;
        break;

      case "-":
        result -= number;
        break;

      case "*":
        result *= number;
        break;

      case "/":
        if (number === 0) {
          throw new Error("Cannot divide by zero");
        }
        result /= number;
        break;

      default:
        throw new Error("Invalid operator");
    }
  }

  return result;
};

function Calculator() {
  const [display, setDisplay] = useState("");

  const buttons = [
    "AC",
    "⌫",
    "%",
    "÷",
    "7",
    "8",
    "9",
    "×",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "=",
  ];

  const handleClick = (value) => {
    if (value === "AC") {
      setDisplay("");
    } else if (value === "⌫") {
      setDisplay(display.slice(0, -1));
    } else if (value === "=") {
      try {
        const expression = display
          .replace(/×/g, "*")
          .replace(/÷/g, "/");

        const result = calculateExpression(expression);

        setDisplay(result.toString());
      } catch {
        setDisplay("Error");
      }
    } else {
      setDisplay(display + value);
    }
  };

  return (
    <div className="calculator">
      <Display value={display} />

      <div className="buttons">
        {buttons.map((btn) => (
          <Button
            key={btn}
            value={btn}
            onClick={handleClick}
            className={
              btn === "="
                ? "equal"
                : btn === "AC"
                ? "clear"
                : btn === "⌫"
                ? "delete"
                : ["+", "-", "×", "÷", "%"].includes(btn)
                ? "operator"
                : btn === "0"
                ? "zero"
                : ""
            }
          />
        ))}
      </div>
    </div>
  );
}

export default Calculator;