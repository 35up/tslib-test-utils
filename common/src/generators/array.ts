import { integer } from './integer.js';
import { take, map } from './operators/index.js';
import { TGenerator } from './types.js';


export function array<T>(
  generator: TGenerator<T>,
  minLength = 0,
  maxLength = 30,
): TGenerator<T[]> {
  if (minLength < 0 || maxLength < 0) {
    throw new TypeError('The range of sizes cannot include negative numbers');
  }

  if (minLength > maxLength) {
    throw new TypeError('The minLength cannot be bigger than maxLength');
  }

  return map(integer(minLength, maxLength), (length) => {
    const arrayItems = take(generator, length);
    return [...arrayItems()];
  });
}
