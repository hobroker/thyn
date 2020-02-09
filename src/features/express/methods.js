const createMethod = method => (path, ...resolvers) => ({
  method,
  path,
  resolvers,
});

export const get = createMethod('get');
