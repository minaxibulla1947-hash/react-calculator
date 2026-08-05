import { useState } from "react";
import Button from "./Button";
import Display from "./Display";

function Calculator() {
  const [display, setDisplay] = useState("");

  const buttons = [
    "AC", "⌫", "%", "÷",
    "7", "8", "9", "×",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", ".", "="
  ];

  const handleClick = (value) => {
    if (value === "AC") {
      setDisplay("");
    } 
    else if (value === "⌫") {
      setDisplay(display.slice(0, -1));
    } 
    else if (value === "=") {
      try {
        const expression = display
  .replace(/×/g, "*")
  .replace(/÷/g, "/");

setDisplay(eval(expression).toString());
      } catch {
        setDisplay("Error");
      }
    } 
    else {
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