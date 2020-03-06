import axios from 'axios';

const Vault = async oxi => {
  const { config } = oxi;
  const { baseURL, token } = config.vault;
  const vault = axios.create({
    baseURL,
    headers: {
      'X-Vault-Token': token,
    },
  });

  return { vault };
};

export default Vault;
