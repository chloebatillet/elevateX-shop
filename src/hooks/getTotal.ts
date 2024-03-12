
export const getTotal = (
  subTotal: number,
  reduction: number,
  deliveryPrice: number
) => {
  return subTotal - reduction + deliveryPrice;
};
