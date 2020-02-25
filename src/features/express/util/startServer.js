import { createDebug } from '../../../util/debug';
import { EXPRESS } from '../constants';

const debugIt = createDebug(`${EXPRESS}:server`);

const startServer = async (port, server) => {
  await new Promise((resolve, reject) => {
    server.listen(port, '0.0.0.0', resolve);
    server.on('error', reject);
  });

  debugIt('listening on http://localhost:%s/', port);

  return server;
};

export default startServer;
