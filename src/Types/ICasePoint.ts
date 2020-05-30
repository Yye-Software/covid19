export interface ICasePoint {
  caseDate: Date;
  state: string;
  case: number;
  newTests: number;
  positiveTests: number;
  negativeTests: number;
  totalPositive: number;
  totalNegative: number;
  totalTests: number;
}
