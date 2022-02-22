import { TGenerator } from '../types';


export function loop<T>(
  generator: () => Iterable<T>,
): TGenerator<T> {
  return function* loopIterator() {
    while (true) {
      yield* generator();
    }
  };
}
