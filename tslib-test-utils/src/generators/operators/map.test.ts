import sinon from 'sinon';
import { expect } from 'chai';
import { map } from './map';
import { from } from './from';

describe('map', () => {
  it('calls the transform function for all items', () => {
    const fn = sinon.stub().callsFake(n => String(n + 1));
    const generator = from([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const mapGenerator = map(generator, fn);
    const iterator = mapGenerator();

    expect(iterator.next()).to.have.property('value', '2');
    expect(iterator.next()).to.have.property('value', '3');
    expect(iterator.next()).to.have.property('value', '4');
    expect(iterator.next()).to.have.property('value', '5');

    expect(fn).to.have.callCount(4);
    expect(fn.firstCall).to.have.been.calledWith(1);
    expect(fn.secondCall).to.have.been.calledWith(2);
    expect(fn.thirdCall).to.have.been.calledWith(3);
    expect(fn.getCall(3)).to.have.been.calledWith(4);
  });

  it('is done when the base generator is done', () => {
    const fn = sinon.stub().callsFake(n => String(n + 1));
    const generator = from([1, 2, 3]);
    const mapGenerator = map(generator, fn);
    const iterator = mapGenerator();

    expect(iterator.next()).to.have.property('value', '2');
    expect(iterator.next()).to.have.property('value', '3');
    expect(iterator.next()).to.have.property('value', '4');
    expect(iterator.next()).to.have.property('done', true);

    expect(fn).to.have.been.calledThrice;
  });
});
