/* eslint-disable no-restricted-syntax,no-await-in-loop */

const resolveObjectWith = async (applier, object) => {
  const result = {};

  for (const [key, fn] of Object.entries(object)) {
    result[key] = await applier(fn);
  }

  return result;
};

export default resolveObjectWith;
