import { expect, assert } from 'chai';
import { join } from './join';
import { number } from '../number';
import { boolean } from '../boolean';
import { char } from '../char';
import { take } from './take';
import { from } from './from';


describe('join', () => {
  it('randomly mixes the generators', () => {
    const generator = take(
      join<string|boolean|number>(char(), number(), boolean()),
      10000,
    );

    for (const item of generator()) {
      assert(['string', 'number', 'boolean'].includes(typeof item));
    }
  });

  it('stops when all iterators stop', () => {
    const generator = join(
      from([1, 2, 3]),
      from([5]),
      from([6, 7]),
    );

    const allItems = [...generator()];

    expect(allItems).to.have.lengthOf(6);
    expect(allItems).to.have.members([1, 2, 3, 5, 6, 7]);
  });
});
