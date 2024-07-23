import { tick, type SvelteComponent } from 'svelte';
import {
  render as testingRender,
  RenderResult,
} from '@testing-library/svelte';


export async function render<C extends SvelteComponent>(
  ...args: Parameters<typeof testingRender<C>>
): Promise<RenderResult<C>> {
  const result = testingRender<C>(...args);
  await tick();
  return result;
}
