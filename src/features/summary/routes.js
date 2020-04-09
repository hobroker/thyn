import { applyTo } from 'ramda';
import { SUMMARY } from './constants';
import resolveObjectWith from '../../util/resolveObjectWith';
import { get } from '../express/methods';

const summaries = async oxi => {
  const { summary } = oxi;
  const data = {};

  await Promise.all(
    Object.entries(summary.fns).map(async ([featureKey, items]) => {
      data[featureKey] = await resolveObjectWith(applyTo(oxi), items);
    }),
  );

  return data;
};

export default {
  [SUMMARY]: {
    '/': [get(summaries)],
  },
};
