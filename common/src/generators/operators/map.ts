import { TGenerator } from '../types.js';


export function map<T, K>(
  generator: () => Iterable<T>,
  fn: (input: T) => K,
): TGenerator<K> {
  return function* mapIterator() {
    for (const item of generator()) {
      yield fn(item);
    }
  };
}
