import { integer } from './integer';
import { take, map } from './operators';
import { TGenerator } from './types';


export function array<T>(
  generator: TGenerator<T>,
  minLength = 0,
  maxLength = 30,
): TGenerator<T[]> {
  if (minLength < 0 || maxLength < 0) {
    throw new TypeError('The range of sizes cannot include negative numbers');
  }

  if (minLength > maxLength) {
    throw new TypeError('The minLength cannot be bellow maxLength');
  }

  return map(integer(minLength, maxLength), (length) => {
    const arrayItems = take(generator, length);
    return [...arrayItems()];
  });
}
