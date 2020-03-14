import { pipe } from 'ramda';
import { debugIt } from '../../util/debug';
import { addRoutes } from '../express/accessors';
import { setModels } from '../mongo/accessors';
import * as models from './models';
import routes from './routes';
import { ensureDependencies, isWebApp } from '../cli/accessors';
// import writeAndRead from './resolvers/writeAndRead';

// eslint-disable-next-line no-unused-vars
const Demo = async oxi => {
  debugIt('Demo start');

  // await oxi(writeAndRead());

  return {};
};

export default pipe(
  ensureDependencies([isWebApp]),
  setModels(models),
  addRoutes(routes),
)(Demo);
