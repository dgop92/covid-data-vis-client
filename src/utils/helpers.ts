export function zipTwoArrs<T = unknown, U = unknown>(a: T[], b: U[]): [T, U][] {
  return a.map((k, i) => [k, b[i]]);
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
