import { ALL, char } from './char.js';
import { array } from './array.js';
import { map } from './operators/index.js';
import { TGenerator } from './types.js';


export function string(
  minLength = 0,
  maxLength = 30,
  set = ALL,
): TGenerator<string> {
  return map(
    array(char(set), minLength, maxLength),
    items => items.join(''),
  );
}
