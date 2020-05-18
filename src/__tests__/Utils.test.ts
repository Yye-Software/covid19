import { getSMA } from "../Utils";

describe("sma test", () => {
  test("should return 4", () => {
    const input: number[] = [1, 2, 3, 4, 5, 6, 7];
    expect(getSMA(input, 7, 7)).toEqual(4);
  });

  test("should not return 4", () => {
    const input: number[] = [1, 2, 3, 4, 5, 6, 1];
    expect(getSMA(input, 7, 7)).not.toEqual(4);
  });
});
