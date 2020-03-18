import { waitForFrame } from './wait-for-frame';

export async function render<T extends HTMLElement>(htmlNode): Promise<T> {
  const container = document.createElement('div');
  document.body.appendChild(container);
  container.innerHTML = htmlNode;

  await waitForFrame();

  return container.firstChild as T;
}
