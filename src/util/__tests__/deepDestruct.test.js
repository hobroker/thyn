import deepDestruct from '../deepDestruct';

describe('deepDestruct', () => {
  it('should clone an object', () => {
    const input = {
      one: 1,
      two: {
        three: 3,
      },
    };
    const result = deepDestruct(input);

    expect(result).toStrictEqual(input);
    expect(result).not.toBe(input);
  });

  it('should clone an array', () => {
    const input = [1, { two: 2 }, 3, 'four'];
    const result = deepDestruct(input);

    expect(result).toStrictEqual(input);
    expect(result).not.toBe(input);
  });
});
