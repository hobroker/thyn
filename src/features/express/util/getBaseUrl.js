const getBaseUrl = ({ protocol, headers: { host } }) => `${protocol}://${host}`;

export default getBaseUrl;
