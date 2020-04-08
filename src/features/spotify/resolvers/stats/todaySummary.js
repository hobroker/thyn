import getDataFromToday from '../getDataFromToday';

const todaySummary = () => async oxi => {
  const data = await oxi(getDataFromToday());

  return data;
};

export default todaySummary;
