import { isString } from 'ramda-adjunct';

const throwIt = error => () => {
  if (isString(error)) {
    throw new Error(error);
  }

  throw error;
};

export default throwIt;
