import getDataFromToday from '../getDataFromToday';
import countMinutes from '../../util/countMinutes';

const minutesToday = () => async oxi => {
  const list = await oxi(getDataFromToday());

  return countMinutes(list);
};

export default minutesToday;
