import { ALL, char } from './char';
import { array } from './array';
import { map } from './operators';

export function string(
  minLength = 0,
  maxLength = 30,
  set = ALL,
): () => IterableIterator<string> {
  return map(
    array(char(set), minLength, maxLength),
    items => items.join(''),
  );
}
