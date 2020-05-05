import { ICasePoint } from "./ICasePoint";

export interface ICaseDiff extends ICasePoint {
  caseDiff: number;
  movingAverage?: number;
}
