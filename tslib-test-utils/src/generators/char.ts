import { integer } from './integer';

/**
 * Generates chars from withing the UTF-16 range provided
 * @param from starting character of the range
 * @param to the final character of the range
 */
export function char(from = '!', to = '~'): () => IterableIterator<string> {
  return function* charsIterator() {
    const possibleChars = to.charCodeAt(0) - from.charCodeAt(0);
    const charIndexGenerator = integer(0, possibleChars + 1);

    for (const charIndex of charIndexGenerator()) {
      yield String.fromCharCode(from.charCodeAt(0) + charIndex);
    }
  };
}
