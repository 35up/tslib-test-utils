export function delayResolve<T>(ms: number, result: T): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(result), ms));
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
