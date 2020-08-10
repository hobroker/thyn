import http from 'http';
import { whenDying } from '../features/death/helpers';
import startServer from '../features/express/util/startServer';
import { debugIt } from '../util/debug';
import { getExpress, getExpressConfig } from '../features/express/accessors';

const web = async oxi => {
  const express = getExpress(oxi);
  const { baseURL, port } = getExpressConfig(oxi);

  const server = http.createServer(express);
  await startServer(port, server);
  debugIt('baseURL', baseURL);

  oxi(
    whenDying(() => {
      debugIt('stopping');

      return new Promise(server.close.bind(server));
    }),
  );
};

export default web;
