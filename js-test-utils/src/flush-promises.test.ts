import { expect } from 'chai';
import sinon from 'sinon';
import { flushPromises } from './flush-promises';


describe('flush-promises', () => {
  it('flushes all pending promises', async () => {
    let promiseChainResolved = false;
    (async (): Promise<void> => {
      await Promise.resolve();
      await Promise.resolve();
      await Promise.resolve();
    })().then(() => { promiseChainResolved = true; });

    await flushPromises();

    expect(promiseChainResolved).to.be.true;
  });

  it('works with jest fake timers', async () => {
    function runInterval(callback, interval): void {
      setInterval(async () => {
        await Promise.resolve();
        callback();
      }, interval);
    }

    jest.useFakeTimers();
    const spy = sinon.spy();

    runInterval(spy, 2000);

    jest.advanceTimersByTime(1000);
    await flushPromises();

    expect(spy).to.have.not.been.calledOnce;

    jest.advanceTimersByTime(1000);

    expect(spy).to.have.not.been.calledOnce;

    await flushPromises();

    expect(spy).to.have.been.calledOnce;

    jest.advanceTimersByTime(2000);
    await flushPromises();

    expect(spy).to.have.been.calledTwice;
  });
});
