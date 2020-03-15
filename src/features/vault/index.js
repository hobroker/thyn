import axios from 'axios';
import updateToken from './resolvers/updateToken';
import { debugIt } from '../../util/debug';

const Vault = async oxi => {
  debugIt('init');
  const { config } = oxi;
  const { baseURL } = config.vault;
  const vault = axios.create({
    baseURL,
  });

  await updateToken(null, { vault, config });

  return {
    vault,
  };
};

export default Vault;
