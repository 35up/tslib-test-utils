import { tick } from 'svelte';
import {
  render as testingRender,
  RenderResult,
} from '@testing-library/svelte';
import type { SvelteComponent } from 'svelte/types/runtime';


export async function render<C extends SvelteComponent>(
  ...args: Parameters<typeof testingRender<C>>
): Promise<RenderResult<C>> {
  const result = testingRender<C>(...args);
  await tick();
  return result;
}
