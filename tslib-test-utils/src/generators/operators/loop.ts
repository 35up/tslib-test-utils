export function loop<T>(
  generator: () => Iterable<T>,
): () => IterableIterator<T> {
  return function* loopIterator() {
    while (true) {
      yield* generator();
    }
  };
}
