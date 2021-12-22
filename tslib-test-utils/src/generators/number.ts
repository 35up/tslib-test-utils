// It is safe because the implementation avoid the possibility of overflowing
// floats
function safeRandomNumber(from: number, to: number): number {
  const nm = Math.random() - 0.5;

  const middle = to / 2 + from / 2;

  if (nm > 0) {
    return middle + nm * (to - middle) * 2;
  }

  return middle + nm * (from - middle) * -2;
}

export function number(
  from = -Number.MAX_VALUE,
  to = Number.MAX_VALUE,
): () => IterableIterator<number> {
  return function* numberIterator() {
    while (true) {
      yield safeRandomNumber(from, to);
    }
  };
}
