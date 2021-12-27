import { integer } from './integer';
import { take, map } from './operators';

export function array<T>(
  generator: () => IterableIterator<T>,
  minLength = 0,
  maxLength = 30,
): () => IterableIterator<T[]> {
  if (minLength < 0 || maxLength < 0) {
    throw new TypeError('The range of sizes cannot include negative numbers');
  }

  if (minLength > maxLength) {
    throw new TypeError('The minSize cannot be bellow maSize');
  }

  return map(integer(minLength, maxLength), (length) => {
    const arrayItems = take(generator, length);
    return [...arrayItems()];
  });
}
