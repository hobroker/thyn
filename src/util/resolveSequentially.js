/* eslint-disable no-restricted-syntax,no-await-in-loop */

const resolveSequentially = async (applier, array) => {
  const result = [];

  for (const item of array) {
    result.push(await applier(item));
  }

  return result;
};

export default resolveSequentially;
