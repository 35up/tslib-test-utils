import { SinonStub } from 'sinon';


// eslint-disable-next-line
export const makeTypedMockFn = <T extends (...args: any[]) => any>(fn: T) => (
  fn as unknown as SinonStub<Parameters<typeof fn>, ReturnType<typeof fn>>
);
