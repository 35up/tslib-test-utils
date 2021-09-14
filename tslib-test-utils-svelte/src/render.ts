import { tick } from 'svelte';
import { render as testingRender } from '@testing-library/svelte';


export async function render(
  ...args: Parameters<typeof testingRender>
): Promise<ReturnType<typeof testingRender>> {
  const result = testingRender(...args);
  await tick();
  return result;
}
