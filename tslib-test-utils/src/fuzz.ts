export function fuzz<T>(
  iterable: () => Iterable<T>,
  description: string,
  fn: (arg: T) => (Promise<void> | void),
): void {
  // eslint-disable-next-line prefer-arrow-callback,func-names
  it(description, async function () {
    for (const item of iterable()) {
      await fn.call(this, item);
    }
  });
}
