export function flat<T>(
  generator: () => Iterable<() => Iterable<T>>,
): () => IterableIterator<T> {
  return function* flatIterator() {
    for (const item of generator()) {
      yield* item();
    }
  };
}
