import React, { useState } from "react";

const years = 3;

const giftLevels = [
  150000, 80000, 50000, 35000, 25000, 15000, 7500, 5000, 2500, 1200,
];

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
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

interface RowProps {
  total: number;
  currentTotal: number;
  onSelect: (total: number) => void;
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

const Row = ({ total, currentTotal, onSelect }: RowProps) => {
  return (
    <tr
      onClick={() => onSelect(total)}
      className={classNames(total === currentTotal && "row-current")}
    >
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

const Calculator = () => {
  const [amount, setAmount] = useState(0);

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
            <input
              type="text"
              prefix="$"
              value={amount == 0 ? "" : amount / years / 365}
              onChange={(e) => {
                console.log("day changed");
                const value = parseFloat(e.target.value);

                if (isNaN(value)) {
                  setAmount(0);
                } else {
                  setAmount(value * years * 365);
                }
              }}
            />
          </td>
          <td>
            <input
              type="text"
              prefix="$"
              value={amount == 0 ? "" : amount / years / 52}
              onChange={(e) => {
                console.log("week changed");
                const value = parseFloat(e.target.value);

                if (isNaN(value)) {
                  setAmount(0);
                } else {
                  setAmount(value * years * 52);
                }
              }}
            />
          </td>
          <td>
            <input
              type="text"
              prefix="$"
              value={amount == 0 ? "" : amount / 3 / 12}
              onChange={(e) => {
                console.log("month changed");
                const value = parseFloat(e.target.value);

                if (isNaN(value)) {
                  setAmount(0);
                } else {
                  setAmount(value * years * 12);
                }
              }}
            />
          </td>
          <td>
            <input
              type="text"
              prefix="$"
              value={amount == 0 ? "" : amount / years}
              onChange={(e) => {
                console.log("year changed");
                const value = parseFloat(e.target.value);

                if (isNaN(value)) {
                  setAmount(0);
                } else {
                  setAmount(value * years);
                }
              }}
            />
          </td>
          <td>
            <input
              type="text"
              prefix="$"
              value={amount == 0 ? "" : amount}
              onChange={(e) => {
                console.log("year changed");
                const value = parseFloat(e.target.value);

                if (isNaN(value)) {
                  setAmount(0);
                } else {
                  setAmount(value);
                }
              }}
            />
          </td>
        </tr>

        {giftLevels.map((total) => (
          <Row
            key={total}
            total={total}
            currentTotal={amount}
            onSelect={setAmount}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Calculator;
