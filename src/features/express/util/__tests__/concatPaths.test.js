import each from 'jest-each';
import concatPaths from '../concatPaths';

describe('concatPaths', () => {
  each([
    [['one', 'two'], 'one/two'],
    [['/one', 'two'], '/one/two'],
    [['/one', '/two/'], '/one/two'],
  ]).it('should join "%s" with forward slashes', (input, expected) => {
    expect(concatPaths(input)).toBe(expected);
  });
});
