import { curry } from 'ramda';
import { getCli } from '../features/cli/accessors';

const applyApps = curry((apps, features, oxi) => {
  const { getApp } = oxi(getCli);
  const app = getApp(apps);

  return app(oxi, features);
});

export default applyApps;
