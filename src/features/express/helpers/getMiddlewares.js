import { applyTo, chain, compose, filter, not, prop } from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { MIDDLEWARES } from '../constants';

export const getAllMiddlewares = compose(
  filter(compose(not, isNilOrEmpty)),
  chain(prop(MIDDLEWARES)),
);

const getMiddlewares = features => oxi => {
  const fns = getAllMiddlewares(features);

  return fns.map(applyTo(oxi));
};
export default getMiddlewares;
