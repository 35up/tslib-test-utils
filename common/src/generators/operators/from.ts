import { TGenerator } from '../types';


export function from<T>(items: Iterable<T>): TGenerator<T> {
  return function* fromIterator() {
    yield* items;
  };
}
