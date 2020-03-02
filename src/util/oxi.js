import { __, nthArg, pipe, prop } from 'ramda';

const oxi = arg => {
  const root = {};
  const target = resolver => resolver(root.target);
  const get = pipe(nthArg(1), prop(__, arg));
  const fn = new Proxy(target, { get });
  root.target = fn;

  return root.target;
};

export default oxi;
