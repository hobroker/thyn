import bodyParser from 'body-parser';

const defaultMiddlewares = [bodyParser.json()];

const useMiddlewares = app => {
  const middlewares = defaultMiddlewares;

  middlewares.forEach(middleware => app.use(middleware));

  return app;
};

export default useMiddlewares;
