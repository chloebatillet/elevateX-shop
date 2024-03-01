
export const findItem = (arr: [], key: string, value: string) => {
  return arr.filter((e) => {
    return e[key] === value;
  })[0];
};
