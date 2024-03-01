interface foundProps {
  arr1: string[];
  arr2: string[];
}

export const findInArray = (arr1: string[], arr2: string[]) => {
  return arr1.some((v: string) => arr2.includes(v));
};
