import { expect } from 'chai';
import { loop } from './loop';


describe('loop', () => {
  it.each(
    [[[1, 2]], [[4]], [[9, 2, 4]]],
  )(
    'repeats %p again and again',
    (values) => {
      const generator = loop(() => values);
      const iterator = generator();

      for (let i = 0; i < 40; i++) {
        const { value } = iterator.next();

        expect(value).to.equal(values[i % values.length]);
      }
    },
  );
});
