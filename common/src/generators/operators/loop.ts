import { TGenerator } from '../types.js';


export function loop<T>(
  generator: () => Iterable<T>,
): TGenerator<T> {
  return function* loopIterator() {
    while (true) {
      yield* generator();
    }
  };
}
