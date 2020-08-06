import { identity, pipe, prop, propEq, when } from 'ramda';
import mapTo from '../../../util/mapTo';

const profileFacade = when(
  identity,
  pipe(
    prop('body'),
    mapTo({
      id: 'id',
      images: 'images',
      name: 'display_name',
      isPremium: propEq('product', 'premium'),
    }),
  ),
);

export default profileFacade;
