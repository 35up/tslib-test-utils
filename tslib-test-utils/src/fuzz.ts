export function fuzz<T>(
  iterable: () => Iterable<T>,
  description: string,
  fn: (arg: T) => (Promise<void> | void),
): void {
  it(description, async () => {
    for (const item of iterable()) {
      await fn.call(null, item);
    }
  });
}
