import { zip, map } from './operators';

// I need to guard that T is an object, there is no other sensible way to do
// this. `Record` gives the possibilities of arbitrary props and {} means empty
// value
// eslint-disable-next-line @typescript-eslint/ban-types
export function object<T extends object>(
  blueprint: {[P in keyof T]: () => IterableIterator<T[P]>},
): () => IterableIterator<T> {
  const keys = Object.keys(blueprint) as (keyof T)[];
  const iterators = Object
    .values<() => IterableIterator<T[keyof T]>>(blueprint);

  return map(
    zip(iterators),
    values => Object.fromEntries(
      keys.map((key, index) => [key, values[index]]),
    ) as T,
  );
}
