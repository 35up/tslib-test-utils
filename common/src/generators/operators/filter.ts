import { TGenerator } from '../types.js';


export function filter<T>(
  generator: () => Iterable<T>,
  predicate: (item: T) => boolean,
): TGenerator<T> {
  return function* filterIterator() {
    for (const item of generator()) {
      if (!predicate(item)) {
        // I see no reason to forbid this.
        // eslint-disable-next-line no-continue
        continue;
      }

      yield item;
    }
  };
}
