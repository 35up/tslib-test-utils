import { TGenerator } from './types.js';


export function boolean(): TGenerator<boolean> {
  return function* booleanIterator() {
    while (true) {
      yield Math.random() >= 0.5;
    }
  };
}
