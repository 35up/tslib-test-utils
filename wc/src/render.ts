import { render as renderLit, TemplateResult } from 'lit';
// eslint-disable-next-line import/extensions
import { isTemplateResult } from 'lit/directive-helpers.js';
import { waitForFrame } from './wait-for-frame.js';


export async function render<T extends HTMLElement>(
  htmlNode: string | TemplateResult,
): Promise<T> {
  const container = document.createElement('div');
  document.body.appendChild(container);

  if (isTemplateResult(htmlNode)) {
    renderLit(htmlNode, container);
  } else {
    container.innerHTML = htmlNode;
  }

  await waitForFrame();

  // selecting the first element that is not a comment
  return container.querySelector('*') as T;
}
