export function zipTwoArrs<T = unknown, U = unknown>(a: T[], b: U[]): [T, U][] {
  return a.map((k, i) => [k, b[i]]);
}
