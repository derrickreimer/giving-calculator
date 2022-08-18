import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const plainMoneyFormatter = new Intl.NumberFormat("en-US", {
  style: "decimal",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: false,
});

/**
 * Builds a class name string (and excludes falsey items).
 *
 * @param classes - a list of classes.
 * @returns A class name string.
 */
export const classNames = (...classes: (string | boolean)[]) => {
  return classes.filter(Boolean).join(" ");
};

/**
 * Formats a number as currency.
 *
 * @param amount - the amount to format.
 * @returns A formatted number.
 */
const formatMoney = (amount: number) => {
  return currencyFormatter.format(amount);
};

const stringifyMoney = (amount: number) => {
  return plainMoneyFormatter.format(Math.round(amount * 100) / 100);
};

interface RowProps {
  years: number;
  total: number;
  currentTotal: number;
}

interface ColumnProps {
  value: number;
  currentValue: number;
}

const Column = ({ value, currentValue }: ColumnProps) => {
  return (
    <td className={classNames(currentValue === value && "col-current")}>
      {formatMoney(value)}
    </td>
  );
};

const Row = ({ years, total, currentTotal }: RowProps) => {
  return (
    <tr className={classNames(total === currentTotal && "row-current")}>
      <Column
        value={total / years / 365}
        currentValue={currentTotal / years / 365}
      />
      <Column
        value={total / years / 52}
        currentValue={currentTotal / years / 52}
      />
      <Column
        value={total / years / 12}
        currentValue={currentTotal / years / 12}
      />
      <Column value={total / years} currentValue={currentTotal / years} />
      <Column value={total} currentValue={currentTotal} />
    </tr>
  );
};

export interface CalculatorProps {
  years: number;
  giftLevels: number[];
}

const Calculator = ({ years, giftLevels }: CalculatorProps) => {
  const [amount, setAmount] = useState<number>(0);

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
          <th className="hidden md:table-cell">Per Day</th>
          <th className="hidden sm:table-cell">Per Week</th>
          <th className="">Per Month</th>
          <th className="">Per Year</th>
          <th className="">Total</th>
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
          <Row key={total} years={years} total={total} currentTotal={amount} />
        ))}
      </tbody>
    </table>
  );
};

export default Calculator;
