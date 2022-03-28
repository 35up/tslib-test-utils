import { expect } from 'chai';
import { take } from './operators';
import { object } from './object';
import { integer } from './integer';
import { char } from './char';
import { array } from './array';
import { boolean } from './boolean';
import { string } from './string';


describe('object', () => {
  it('generates empty objects if the object plan is empty', () => {
    const generator = take(object({}), 10000);

    for (const obj of generator()) {
      expect(obj).to.deep.equal({});
    }
  });

  it('generates objects based on the blueprint', () => {
    const generator = take(object({
      int: integer(),
      char: char(),
      arr: array(object({
        str: string(),
        bool: boolean(),
      }), 0, 3),
    }), 10000);

    for (const obj of generator()) {
      expect(Object.keys(obj)).to.have.lengthOf(3);
      expect(obj).to.have.property('int')
        .and.itself.is.equal(Math.floor(obj.int));
      expect(obj).to.have.property('char')
        .and.itself.is.a('string')
        .and.itself.has.lengthOf(1);
      expect(obj.arr.length).to.be.greaterThanOrEqual(0).and.below(3);

      for (const item of obj.arr) {
        expect(item).property('str').to.be.a('string');
        expect(item).property('bool').to.be.a('boolean');
      }
    }
  });
});
