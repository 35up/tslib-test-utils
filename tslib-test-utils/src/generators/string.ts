import { char } from './char';
import { array } from './array';
import { map } from './operators';

export function string(
  minLength = 0,
  maxLength = 30,
): () => IterableIterator<string> {
  return map(
    array(char(), minLength, maxLength),
    items => items.join(''),
  );
}
