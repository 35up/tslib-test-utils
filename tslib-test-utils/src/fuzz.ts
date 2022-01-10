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
  samples = 100,
): void {
  // eslint-disable-next-line prefer-arrow-callback,func-names
  it(description, async function () {
    for (const item of take(iterable, samples)()) {
      await fn.call(this, item);
    }
  });
}
