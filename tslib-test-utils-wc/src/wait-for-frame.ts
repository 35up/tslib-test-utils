export async function waitForFrame(): Promise<void> {
  await new Promise((resolve) => {
    window.requestAnimationFrame(resolve);
  });
}
