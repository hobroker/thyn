const createMethod = method => (path, resolver) => ({
  method,
  path,
  resolver,
});

export const get = createMethod('get');
export const post = createMethod('post');
