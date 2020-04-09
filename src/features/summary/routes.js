import { SUMMARY } from './constants';
import { get } from '../express/methods';

const summaries = async oxi => {
  const { summary } = oxi;
  const data = {};

  await Promise.all(
    Object.entries(summary.fns).map(async ([featureKey, items]) => {
      const sub = {};

      await Promise.all(
        Object.entries(items).map(async ([key, fn]) => {
          sub[key] = await fn(oxi);
        }),
      );

      data[featureKey] = sub;
    }),
  );

  return data;
};

export default {
  [SUMMARY]: {
    '/': [get(summaries)],
  },
};
