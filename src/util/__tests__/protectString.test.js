import protectValue from '../protectValue';

describe('protectValue', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // this is important - it clears the cache
    process.env = { ...OLD_ENV };
    delete process.env.NODE_ENV;
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  it('should replace every character with asterisk when NOT in development', () => {
    process.env.NODE_ENV = 'production';

    expect(protectValue('smh')).toEqual('***');
    expect(protectValue([1, 2])).toEqual('***');
  });

  it('should return same value when in development', () => {
    process.env.NODE_ENV = 'development';

    expect(protectValue('smh')).toEqual('smh');
    expect(protectValue([1, 2])).toEqual([1, 2]);
  });
});
