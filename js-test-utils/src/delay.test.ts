import { expect } from 'chai';
import { delay, delayResolve } from './delay';


describe('delay', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('resolves after time elapses', async () => {
    let resolved = false;

    delay(100).then(() => { resolved = true; });

    jest.advanceTimersByTime(50);
    await Promise.resolve();

    expect(resolved).to.be.false;

    jest.advanceTimersByTime(50);
    await Promise.resolve();
    expect(resolved).to.be.true;
  });

  afterEach(() => {
    jest.useRealTimers();
  });
});

describe('delayResolve', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('resolves after time elapses', async () => {
    let resolvedValue: string = null;

    delayResolve(100, 'result')
      .then((value) => { resolvedValue = value; });

    jest.advanceTimersByTime(50);
    await Promise.resolve();

    expect(resolvedValue).to.be.null;

    jest.advanceTimersByTime(50);
    await Promise.resolve();

    expect(resolvedValue).to.equal('result');
  });

  afterEach(() => {
    jest.useRealTimers();
  });
});
