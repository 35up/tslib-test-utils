import { expect } from 'chai';
import sinon, { SinonFakeTimers } from 'sinon';
import { waitForFrame } from './wait-for-frame';


describe('waitForFrame', () => {
  let clock: SinonFakeTimers;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  it('resolves after an animation frame from browser', async () => {
    let promiseStatus = 'pending';

    waitForFrame().then(() => { promiseStatus = 'resolved'; });

    await Promise.resolve();

    expect(promiseStatus).to.equal('pending');

    await clock.nextAsync();

    expect(promiseStatus).to.equal('resolved');
  });
});
