import { integer } from '../integer';
import { TGenerator } from '../types';


/**
 * Randomly joins the generators
 * @param args the generators
 */
export function join<T>(
  ...args: Array<() => Iterator<T>>
): TGenerator<T> {
  return function* joinIterator() {
    const intGenerator = integer(0, args.length);
    const iterators = args.map(gen => gen());
    const finished = new Set();

    for (const index of intGenerator()) {
      if (finished.size === iterators.length) return;

      // eslint-disable-next-line no-continue
      if (finished.has(index)) continue;

      if (iterators[index]) {
        const { value, done } = iterators[index].next();

        if (done) {
          finished.add(index);
          // eslint-disable-next-line no-continue
          continue;
        }

        yield value;
      }
    }
  };
}
