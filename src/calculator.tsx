import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";

export interface CalculatorProps {
  years: number;
  giftLevels: number[];
}

interface RowProps {
  years: number;
  total: number;
}

interface ColumnProps {
  value: number;
}

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const plainMoneyFormatter = new Intl.NumberFormat("en-US", {
  style: "decimal",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: false,
});

const formatMoney = (amount: number) => {
  return moneyFormatter.format(amount);
};

const stringifyMoney = (amount: number) => {
  return plainMoneyFormatter.format(Math.round(amount * 100) / 100);
};

const Column = ({ value }: ColumnProps) => {
  return <td>{formatMoney(value)}</td>;
};

const Row = ({ years, total }: RowProps) => {
  return (
    <tr>
      <Column value={total / years / 365} />
      <Column value={total / years / 52} />
      <Column value={total / years / 12} />
      <Column value={total / years} />
      <Column value={total} />
    </tr>
  );
};

const Calculator = ({ years, giftLevels }: CalculatorProps) => {
  const [dayValue, setDayValue] = useState<string | undefined>("");
  const [weekValue, setWeekValue] = useState<string | undefined>("");
  const [monthValue, setMonthValue] = useState<string | undefined>("");
  const [yearValue, setYearValue] = useState<string | undefined>("");
  const [totalValue, setTotalValue] = useState<string | undefined>("");

  const changeDayValue = (value: string | undefined) => {
    setDayValue(value);

    const numericValue = Number(value) * years * 365;

    if (!Number.isNaN(numericValue)) {
      setWeekValue(stringifyMoney(numericValue / years / 52));
      setMonthValue(stringifyMoney(numericValue / years / 12));
      setYearValue(stringifyMoney(numericValue / years));
      setTotalValue(stringifyMoney(numericValue));
    }
  };

  const changeWeekValue = (value: string | undefined) => {
    setWeekValue(value);

    const numericValue = Number(value) * years * 52;

    if (!Number.isNaN(numericValue)) {
      setDayValue(stringifyMoney(numericValue / years / 365));
      setMonthValue(stringifyMoney(numericValue / years / 12));
      setYearValue(stringifyMoney(numericValue / years));
      setTotalValue(stringifyMoney(numericValue));
    }
  };

  const changeMonthValue = (value: string | undefined) => {
    setMonthValue(value);

    const numericValue = Number(value) * years * 12;

    if (!Number.isNaN(numericValue)) {
      setDayValue(stringifyMoney(numericValue / years / 365));
      setWeekValue(stringifyMoney(numericValue / years / 52));
      setYearValue(stringifyMoney(numericValue / years));
      setTotalValue(stringifyMoney(numericValue));
    }
  };

  const changeYearValue = (value: string | undefined) => {
    setYearValue(value);

    const numericValue = Number(value) * years;

    if (!Number.isNaN(numericValue)) {
      setDayValue(stringifyMoney(numericValue / years / 365));
      setWeekValue(stringifyMoney(numericValue / years / 52));
      setMonthValue(stringifyMoney(numericValue / years / 12));
      setTotalValue(stringifyMoney(numericValue));
    }
  };

  const changeTotalValue = (value: string | undefined) => {
    setTotalValue(value);

    const numericValue = Number(value) * years;

    if (!Number.isNaN(numericValue)) {
      setDayValue(stringifyMoney(numericValue / years / 365));
      setWeekValue(stringifyMoney(numericValue / years / 52));
      setMonthValue(stringifyMoney(numericValue / years / 12));
      setYearValue(stringifyMoney(numericValue / years));
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Per Day</th>
          <th>Per Week</th>
          <th>Per Month</th>
          <th>Per Year</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <CurrencyInput
              prefix="$"
              value={dayValue}
              allowNegativeValue={false}
              decimalsLimit={2}
              onValueChange={(value) => changeDayValue(value)}
            />
          </td>
          <td>
            <CurrencyInput
              prefix="$"
              value={weekValue}
              allowNegativeValue={false}
              decimalsLimit={2}
              onValueChange={(value) => changeWeekValue(value)}
            />
          </td>
          <td>
            <CurrencyInput
              prefix="$"
              value={monthValue}
              allowNegativeValue={false}
              decimalsLimit={2}
              onValueChange={(value) => changeMonthValue(value)}
            />
          </td>
          <td>
            <CurrencyInput
              prefix="$"
              value={yearValue}
              allowNegativeValue={false}
              decimalsLimit={2}
              onValueChange={(value) => changeYearValue(value)}
            />
          </td>
          <td>
            <CurrencyInput
              prefix="$"
              value={totalValue}
              allowNegativeValue={false}
              decimalsLimit={2}
              onValueChange={(value) => changeTotalValue(value)}
            />
          </td>
        </tr>

        {giftLevels.map((total) => (
          <Row key={total} years={years} total={total} />
        ))}
      </tbody>
    </table>
  );
};

export default Calculator;
