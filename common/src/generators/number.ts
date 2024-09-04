import { TGenerator } from './types.js';


// It is safe because the implementation avoids the possibility of overflowing
// floats
function safeRandomNumber(from: number, to: number): number {
  const num = Math.random() - 0.5;

  const middle = to / 2 + from / 2;

  if (num > 0) {
    return middle + num * (to - middle) * 2;
  }

  return middle + num * (from - middle) * -2;
}

export function number(
  from = -Number.MAX_VALUE,
  to = Number.MAX_VALUE,
): TGenerator<number> {
  return function* numberIterator() {
    while (true) {
      yield safeRandomNumber(from, to);
    }
  };
}
