import * as glide from "./glide";

function factorial(n) {
  if (n < 0) return -1;
  if (n === 0) return 1;
  return n * factorial(n - 1);
}

export default glide.api(async (params) => {
  const { number: numberRaw } = params;
  if (numberRaw === undefined) {
    return undefined;
  }

  const number = parseInt(numberRaw.value, 10);
  if (number === NaN) {
    return undefined;
  }

  return {
    type: "number",
    value: factorial(number),
  };
});
