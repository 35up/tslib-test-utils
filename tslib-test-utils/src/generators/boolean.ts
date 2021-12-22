export function boolean(): () => IterableIterator<boolean> {
  return function* booleanIterator() {
    while (true) {
      const coin = Math.random() - 0.5;

      yield coin >= 0;
    }
  };
}
