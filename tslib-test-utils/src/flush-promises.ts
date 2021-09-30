const { nextTick } = process;

export async function flushPromises(): Promise<void> {
  return new Promise(resolve => nextTick.call(process, resolve));
}
