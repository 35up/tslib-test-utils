import { render as renderLit, TemplateResult } from 'lit-html';
import { waitForFrame } from './wait-for-frame';

export async function render<T extends HTMLElement>(
  htmlNode: string | TemplateResult,
): Promise<T> {
  const container = document.createElement('div');
  document.body.appendChild(container);

  if (htmlNode instanceof TemplateResult) {
    renderLit(htmlNode, container);
  } else {
    container.innerHTML = htmlNode;
  }

  await waitForFrame();

  // selecting the first element that is not a comment
  return container.querySelector('*') as T;
}
