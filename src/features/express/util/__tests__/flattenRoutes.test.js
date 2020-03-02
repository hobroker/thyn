import flattenRoutes from '../flattenRoutes';
import { get, post } from '../../methods';

describe('flattenRoutes', () => {
  const resolver = () => {};

  it('should return the expected array', () => {
    const routes = {
      '/': [get(resolver), post(resolver)],
      '/one': get(resolver),
    };

    expect(flattenRoutes(routes)).toEqual([
      { path: '/', method: 'get', resolver },
      { path: '/', method: 'post', resolver },
      { path: '/one', method: 'get', resolver },
    ]);
  });

  it('should accept a nested object', () => {
    const routes = {
      '/': {
        one: [get(resolver)],
        two: {
          three: [get(resolver), post(resolver)],
        },
      },
    };

    expect(flattenRoutes(routes)).toEqual([
      { path: '/one', method: 'get', resolver },
      { path: '/two/three', method: 'get', resolver },
      { path: '/two/three', method: 'post', resolver },
    ]);
  });
});
