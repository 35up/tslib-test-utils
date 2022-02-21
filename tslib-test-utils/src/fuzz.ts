import { take } from './generators';

/**
 * Examples: {@link ./fuzz.examples.test.ts}
 * @param iterable
 * @param description
 * @param fn
 * @param samples
 */
export function fuzz<T>(
  iterable: () => Iterable<T>,
  description: string,
  fn: (arg: T) => (Promise<void> | void),
  samples = 30,
): void {
  for (const item of take(iterable, samples)()) {
  // eslint-disable-next-line prefer-arrow-callback,func-names
    it(description, async function () {
      await fn.call(this, item);
    });
  }
}
/**
 * Examples: {@link ./fuzz.examples.test.ts}
 * @param iterable
 * @param description
 * @param fn
 * @param samples
 */
export function fuzzDescribe<T>(
  iterable: () => Iterable<T>,
  description: string,
  fn: (arg: T) => void,
  samples = 30,
): void {
  for (const item of take(iterable, samples)()) {
  // eslint-disable-next-line prefer-arrow-callback,func-names
    describe(description, function () {
      fn.call(this, item);
    });
  }
}

