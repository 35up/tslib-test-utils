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
  samples = 7,
): void {
  for (const item of take(iterable, samples)()) {
  // eslint-disable-next-line prefer-arrow-callback,func-names
    test(`${description} - with input ${JSON.stringify(item, null, 2)}`, async function () {
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
  samples = 7,
): void {
  for (const item of take(iterable, samples)()) {
  // eslint-disable-next-line prefer-arrow-callback,func-names
    describe(`${description} - with input ${JSON.stringify(item, null, 2)}`, function () {
      fn.call(this, item);
    });
  }
}

