import { ApolloServer } from 'apollo-server-express';
import { always, applySpec, compose } from 'ramda';
import getSchema from './helpers/getSchemas';
import { OPTIONS } from './constants';
import { EXPRESS } from '../express/constants';
import { debugIt } from '../../util/debug';
import isDevelopment from '../../util/isDevelopment';
import { ensureDependencies, isWebApp } from '../cli/accessors';

const Apollo = async (oxi, features) => {
  const { baseURL, app } = oxi[EXPRESS];
  const schema = getSchema(features);

  const apollo = new ApolloServer({
    ...OPTIONS,
    schema,
    introspection: isDevelopment(),
    context: applySpec({
      oxi: always(oxi),
    }),
  });

  apollo.applyMiddleware({
    app,
  });

  debugIt(`Apollo running at ${baseURL}/graphql`);

  return {
    apollo,
  };
};

export default compose(ensureDependencies([isWebApp]))(Apollo);
