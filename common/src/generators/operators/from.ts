import { TGenerator } from '../types.js';


export function from<T>(items: Iterable<T>): TGenerator<T> {
  return function* fromIterator() {
    yield* items;
  };
}
