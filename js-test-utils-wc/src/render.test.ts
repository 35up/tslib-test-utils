import { expect } from 'chai';
import sinon, { SinonSandbox } from 'sinon';
import { render } from './render';

describe('render', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('renders the tag in the document', async () => {
    await render('<span class="real very">content</span>');

    expect(document.body).to.have.descendant('span.very.real');
  });

  it('returns the rendered element', async () => {
    const element = await render('<span class="real very">content</span>');

    expect(element).to.have.match('span.very.real');
    expect(element).to.have.text('content');
  });

  it('waits for the element to have been initialized to return it', async () => {
    const clock = sandbox.useFakeTimers();

    let connected = false;
    let promiseStatus = 'pending';

    customElements.define(
      'test-element',
      class TestElement extends HTMLElement {
        connectedCallback(): void {
          connected = true;
        }
      },
    );

    render('<test-element></test-element>')
      .then(() => { promiseStatus = 'resolved'; });

    await Promise.resolve();

    expect(promiseStatus).to.equal('pending');

    await clock.nextAsync();

    expect(connected).to.be.true;
    expect(promiseStatus).to.equal('resolved');
  });
});
