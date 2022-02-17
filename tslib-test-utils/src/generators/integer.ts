import { number } from './number';
import { map } from './operators';

export function integer(
  from = Number.MIN_SAFE_INTEGER,
  to = Number.MAX_SAFE_INTEGER,
): () => IterableIterator<number> {
  return map(number(from, to), Math.floor);
}
