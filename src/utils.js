import { accounting } from "accounting";
import data from "./data.json";

export const money = (amount) =>
  accounting.formatMoney(amount, "$", 0, ".", ",");
export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export const setData = () =>
  Object.keys(data).reduce(
    (total, current) => ({
      ...total,
      [current]: data[current].reduce(
        (total, current) => ({
          ...total,
          [current.name]: { ...current, amount: 0 },
        }),
        {}
      ),
    }),
    {}
  );
