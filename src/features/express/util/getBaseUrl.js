const getBaseUrl = req => `${req.protocol}://${req.get('host')}`;

export default getBaseUrl;
