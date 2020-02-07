import esModuleValues from '../esModuleValues';

describe('esModuleValues', () => {
  it('should omit __esModule prop and get object values', () => {
    const input = {
      __esModule: false,
      one: 1,
    };
    const result = esModuleValues(input);

    expect(result).toEqual([1]);
  });

  it('should work without __esModule oresent', () => {
    const input = {
      two: 2,
      three: 3,
    };
    const result = esModuleValues(input);

    expect(result).toEqual([2, 3]);
  });
});
