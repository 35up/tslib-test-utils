export async function waitForCycles(cycles: number): Promise<void> {
  if (cycles <= 1) {
    await Promise.resolve();
  } else {
    await waitForCycles(cycles - 1);
  }
}
