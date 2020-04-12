import { debugIt } from '../../../util/debug';

const startServer = async (port, server) => {
  await new Promise((resolve, reject) => {
    server.listen(port, '0.0.0.0', resolve);
    server.on('error', reject);
  });

  debugIt('listening on port', port);

  return server;
};

export default startServer;
