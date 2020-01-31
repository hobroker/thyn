import mapTo from '../mapTo';

describe('mapTo', () => {
  it('should modify the object according to the map provided', () => {
    const map = { port: 'PORT' };
    const obj = { PORT: 3000 };
    expect(mapTo(map, obj)).toEqual({ port: 3000 });
  });

  it('should modify the object according to the nested map provided', () => {
    const map = {
      nested: {
        port: 'PORT',
      },
    };
    const obj = { PORT: 3000 };
    expect(mapTo(map, obj)).toEqual({ nested: { port: 3000 } });
  });

  it('should modify the object according to function provided in map', () => {
    const map = {
      nested: {
        port: obj => obj.PORT + 1,
      },
    };
    const obj = { PORT: 3000 };
    expect(mapTo(map, obj)).toEqual({ nested: { port: 3001 } });
  });
});
