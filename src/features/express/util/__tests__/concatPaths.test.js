import concatPaths from '../concatPaths';

describe('concatPaths', () => {
  const cases = [
    [['/'], '/'],
    [['/', '/one'], '/one'],
    [['one', 'two'], 'one/two'],
    [['/one', 'two'], '/one/two'],
    [['/one', '/two/'], '/one/two'],
  ];

  cases.forEach(([input, output]) => {
    it(`should convert "${input}" to "${output}"`, () => {
      expect(concatPaths(input)).toBe(output);
    });
  });
});
