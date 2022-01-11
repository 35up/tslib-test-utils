import { integer } from './integer';

export const UPPER_CASE_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
export const LOWER_CASE_LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('');
export const NUMBERS = '1234567890'.split('');
export const SYMBOLS = '!"§$%&/()=\'`#+*~-_.:,;<>|^°?'.split('');
export const ALL = UPPER_CASE_LETTERS.concat(
  LOWER_CASE_LETTERS,
  NUMBERS,
  SYMBOLS,
);

export function char(set = ALL): () => IterableIterator<string> {
  return function* charsIterator() {
    const indexGenerator = integer(0, set.length);

    for (const charIndex of indexGenerator()) {
      yield set[charIndex];
    }
  };
}
