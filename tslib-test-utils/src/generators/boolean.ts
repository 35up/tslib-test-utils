export function boolean(): () => IterableIterator<boolean> {
  return function* booleanIterator() {
    while (true) {
      yield Math.random() >= 0.5;
    }
  };
}
