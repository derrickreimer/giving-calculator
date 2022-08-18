import React from "react";
import ReactDOM from "react-dom";
import Calculator from "./calculator";

const container = document.getElementById("giving-calculator");

const defaultYears = 3;

const defaultGiftLevels = [
  150000, 80000, 50000, 35000, 25000, 15000, 7500, 5000, 2500, 1200,
];

const years = (value: string | undefined) => {
  const numericValue = Number(value);

  if (!Number.isNaN(years)) {
    console.log(numericValue);
    return numericValue;
  } else {
    return defaultYears;
  }
};

const giftLevels = (value: string | undefined) => {
  if (value) {
    const numericValues = value.split(",").map(Number);

    if (numericValues.every((v) => !Number.isNaN(v))) {
      console.log(numericValues);
      return numericValues;
    } else {
      return defaultGiftLevels;
    }
  } else {
    return defaultGiftLevels;
  }
};

if (container) {
  ReactDOM.render(
    <Calculator
      years={years(container.dataset.years)}
      giftLevels={giftLevels(container.dataset.giftLevels)}
    />,
    container
  );
}
