import { always, compose } from 'ramda';
import { debugIt } from '../../util/debug';
import { addRoutes } from '../express/accessors';
import { setModels } from '../mongo/accessors';
import * as models from './models';
import routes from './routes';
import { ensureIsWebApp } from '../cli/accessors';
import { DEMO } from './constants';

const Demo = async ({ summary }) => {
  debugIt('Demo start');

  summary.set(DEMO, {
    default: always('I am the demo'),
  });
};

export default compose(
  setModels(models),
  addRoutes(routes),
  ensureIsWebApp,
)(Demo);
