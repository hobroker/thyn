import { curry } from 'ramda';

const applyApps = curry((apps, oxi) => {
  const { cli } = oxi;
  const app = cli(apps);

  return app(oxi);
});

export default applyApps;
