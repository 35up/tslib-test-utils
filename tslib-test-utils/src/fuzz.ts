import { take } from './generators';


type TFuzzDescription<T> = string | ((arg: T) => string);

function makeDescription<T>(description: TFuzzDescription<T>, arg: T): string {
  if (typeof description === 'function') return description(arg);

  return `${description} - with input ${JSON.stringify(arg, null, 2)}`;
}

/**
 * Examples: {@link ./fuzz.examples.test.ts}
 * @param iterable
 * @param description
 * @param fn
 * @param samples
 */
export function fuzz<T>(
  iterable: () => Iterable<T>,
  description: TFuzzDescription<T>,
  fn: (arg: T) => (Promise<void> | void),
  samples = 7,
): void {
  for (const item of take(iterable, samples)()) {
  // eslint-disable-next-line prefer-arrow-callback,func-names
    test(makeDescription(description, item), async function () {
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
  description: TFuzzDescription<T>,
  fn: (arg: T) => void,
  samples = 7,
): void {
  for (const item of take(iterable, samples)()) {
  // eslint-disable-next-line prefer-arrow-callback,func-names
    describe(makeDescription(description, item), function () {
      fn.call(this, item);
    });
  }
}

