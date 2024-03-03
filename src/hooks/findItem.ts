import { Product } from "../@types";

export const findItem = (
  arr: Product[],
  key: keyof Product,
  value: string | undefined
) => {
  return arr.filter((e: Product) => {
    return e[key] === value;
  })[0];
};
