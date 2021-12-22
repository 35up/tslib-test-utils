export function from<T>(items: Iterable<T>): () => IterableIterator<T> {
  return function* fromIterator() {
    yield* items;
  };
}
