import { differenceInMinutes, parseISO } from 'date-fns';
import { compose, length, prop, useWith } from 'ramda';
import { subtractNum } from 'ramda-adjunct';

const makeDateFromItem = compose(parseISO, prop('createdAt'));

const diffBetweenTwoItems = compose(
  Math.abs,
  useWith(differenceInMinutes, [makeDateFromItem, makeDateFromItem]),
);

const getDiffInMinutes = list => {
  let prev = null;

  return list.reduce((acc, next) => {
    if (prev) {
      acc.push(diffBetweenTwoItems(prev, next));
    }

    prev = next;

    return acc;
  }, []);
};

// expecting records to be 1 minute apart
const countMinutes = compose(subtractNum(1), length);

export { getDiffInMinutes };

export default countMinutes;
