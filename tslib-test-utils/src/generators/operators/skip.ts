export function skip<T>(
  generator: () => Iterable<T>,
  count: number,
): () => IterableIterator<T> {
  return function* skipIterator() {
    let currentCount = 0;

    for (const item of generator()) {
      if (currentCount < count) {
        currentCount += 1;
        // I see no reason to forbid this.
        // eslint-disable-next-line no-continue
        continue;
      }

      yield item;
    }
  };
}
