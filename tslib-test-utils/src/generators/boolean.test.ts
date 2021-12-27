import { expect } from 'chai';
import { boolean } from './boolean';
import { take } from './operators';

describe('boolean', () => {
  it('only generates booleans', () => {
    const generator = take(boolean(), 1000);

    for (const item of generator()) {
      expect(item).to.be.a('boolean');
    }
  });

  it('produces roughly the same number of true and false', () => {
    const generator = boolean();
    const first1000000 = [...take(generator, 1000000)()];

    const distribution = first1000000.reduce((acc, val) => ({
      ...acc,
      [String(val)]: acc[String(val)] + 1,
    }), {[String(true)]: 0, [String(false)]: 0});

    const ratio = {
      true: distribution[String(true)] / 1000000,
      false: distribution[String(false)] / 1000000,
    };

    expect(Math.abs(ratio.true - ratio.false)).to.be.below(0.01);
  });
});
