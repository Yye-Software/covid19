import { ICaseDiff } from "./Types/ICaseDiff";

export const getSMA = (
  valArray: number[],
  curr: number,
  ma: number
): number => {
  const start: number = curr - ma;
  const sum: number = valArray
    .slice(start, curr)
    //.map((c) => c.caseDiff)
    .reduce((x, curr) => x + curr);
  return sum / ma;
};

export const getCaseDiffSMA = (
  cases: ICaseDiff[],
  curr: number,
  ma: number
) => {
  return getSMA(
    cases.map((c) => c.caseDiff),
    curr,
    ma
  );
};
