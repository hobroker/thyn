import each from 'jest-each';
import concatPaths from '../concatPaths';

describe('concatPaths', () => {
  each([
    [['/'], '/'],
    [['/', '/one'], '/one'],
    [['one', 'two'], 'one/two'],
    [['/one', 'two'], '/one/two'],
    [['/one', '/two/'], '/one/two'],
  ]).it('should convert "%s" to "%s"', (input, expected) => {
    expect(concatPaths(input)).toBe(expected);
  });
});
