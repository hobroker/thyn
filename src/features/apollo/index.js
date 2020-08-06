import { ApolloServer } from 'apollo-server-express';
import { always, applySpec } from 'ramda';
import getSchema from './helpers/getSchemas';
import { OPTIONS } from './constants';
import { debugIt } from '../../util/debug';
import { ensureIsWebApp } from '../cli/accessors';
import { getExpress, getExpressConfig } from '../express/accessors';

const Apollo = async (oxi, features) => {
  const { baseURL } = oxi(getExpressConfig);
  const app = oxi(getExpress);
  const schema = getSchema(features);

  const apollo = new ApolloServer({
    ...OPTIONS,
    schema,
    introspection: true,
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

export default ensureIsWebApp(Apollo);
