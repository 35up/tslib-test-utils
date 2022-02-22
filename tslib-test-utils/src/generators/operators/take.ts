import { TGenerator } from '../types';


export function take<T>(
  generator: () => Iterable<T>,
  count: number,
): TGenerator<T> {
  return function* takeIterator() {
    let currentCount = 0;

    for (const item of generator()) {
      if (currentCount >= count) return;
      yield item;

      currentCount += 1;
    }
  };
}
