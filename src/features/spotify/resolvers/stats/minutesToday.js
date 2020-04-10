import getTodayPlayableEntries from '../getTodayPlayableEntries';
import countMinutes from '../../util/countMinutes';

const minutesToday = () => async oxi => {
  const list = await oxi(getTodayPlayableEntries());

  return countMinutes(list);
};

export default minutesToday;
