const { nextTick } = process;

export async function flushPromises() {
  await new Promise(resolve => nextTick.call(process, resolve));
}
