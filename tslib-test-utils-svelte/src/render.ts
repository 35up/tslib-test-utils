import { tick } from 'svelte';
import {
  render as testingRender,
  RenderResult,
} from '@testing-library/svelte';


export async function render(
  ...args: Parameters<typeof testingRender>
): Promise<RenderResult> {
  const result = testingRender(...args);
  await tick();
  return result;
}
