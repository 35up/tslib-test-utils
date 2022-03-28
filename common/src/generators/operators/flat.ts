import { TGenerator } from '../types';


export function flat<T>(
  generator: () => Iterable<() => Iterable<T>>,
): TGenerator<T> {
  return function* flatIterator() {
    for (const item of generator()) {
      yield* item();
    }
  };
}
