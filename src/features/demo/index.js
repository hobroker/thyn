import { always, pipe } from 'ramda';
import { debugIt } from '../../util/debug';
import { addRoutes } from '../express/accessors';
import { setModels } from '../mongo/accessors';
import * as models from './models';
import routes from './routes';
import { ensureDependencies, isWebApp } from '../cli/accessors';
import { DEMO } from './constants';

const Demo = async ({ summary }) => {
  debugIt('Demo start');

  summary.set(DEMO, always("I'm the demo"));

  return {};
};

export default pipe(
  ensureDependencies([isWebApp]),
  setModels(models),
  addRoutes(routes),
)(Demo);
