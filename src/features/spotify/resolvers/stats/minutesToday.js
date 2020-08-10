import countMinutes from '../../util/countMinutes';
import { getTodayPlayableEntries } from '../entries';

const minutesToday = () => async oxi => {
  const list = await oxi(getTodayPlayableEntries());

  return countMinutes(list);
};

export default minutesToday;
