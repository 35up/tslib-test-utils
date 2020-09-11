import { expect } from 'chai';
import { waitForCycles } from './wait-for-cycles';

describe('wait-for-cycles', () => {
  it('waits for the specified number of cycles', async () => {
    let promiseChainResolved = false;
    (async () => {
      await Promise.resolve(); // +1
      await Promise.resolve(); // +1
      await Promise.resolve(); // +1
    })().then(() => { promiseChainResolved = true; });

    await waitForCycles(3);

    expect(promiseChainResolved).to.be.true;
  });
});
