import { number } from './number.js';
import { map } from './operators';
import { TGenerator } from './types.js';


export function integer(
  from = Number.MIN_SAFE_INTEGER,
  to = Number.MAX_SAFE_INTEGER,
): TGenerator<number> {
  return map(number(from, to), Math.floor);
}
