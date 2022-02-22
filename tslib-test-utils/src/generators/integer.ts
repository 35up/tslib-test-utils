import { number } from './number';
import { map } from './operators';
import { TGenerator } from './types';


export function integer(
  from = Number.MIN_SAFE_INTEGER,
  to = Number.MAX_SAFE_INTEGER,
): TGenerator<number> {
  return map(number(from, to), Math.floor);
}
