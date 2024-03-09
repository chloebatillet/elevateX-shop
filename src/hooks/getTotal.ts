import { CartItem } from "../@types";

export const getTotal = (arr: (CartItem | null)[]) => {    
  return arr.length > 0 ? arr
    .map((e) => {
      return e?.price;
    })
    .reduce((a, b) => {
      return a! + b!;
    }) :  0
};
