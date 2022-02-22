import { TGenerator } from '../types';


/**
 * Merges together the values of each of the generators with the values at the
 * corresponding position.
 * @param generators
 */
export function zip<T extends Array<unknown>>(
  generators: Array<() => Iterator<T[number]>>,
): TGenerator<T> {
  return function* zipGenerator() {
    const iterators = generators.map(generator => generator());

    while (true) {
      const results = iterators.map(iter => iter.next());
      if (results.some(res => res.done)) return;

      yield results.map(res => res.value) as T;
    }
  };
}
