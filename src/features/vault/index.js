import axios from 'axios';
import updateToken from './resolvers/updateToken';

const Vault = async oxi => {
  const { config } = oxi;
  const { baseURL } = config.vault;
  const vault = axios.create({
    baseURL,
  });

  await updateToken(null, { vault, config });

  return { vault };
};

export default Vault;
