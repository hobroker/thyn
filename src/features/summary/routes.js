import { SUMMARY } from './constants';
import { get } from '../express/methods';

const summaries = async oxi => {
  const { summary } = oxi;
  const data = {};

  await Promise.all(
    [...summary].map(async ([key, fn]) => {
      data[key] = await fn(oxi);
    }),
  );

  return data;
};

export default {
  [SUMMARY]: {
    '/': [get(summaries)],
  },
};
