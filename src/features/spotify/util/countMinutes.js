import { differenceInMinutes, parseISO } from 'date-fns';
import { compose, length, prop, useWith } from 'ramda';

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
const countMinutes = compose(length, getDiffInMinutes);

export { getDiffInMinutes };

export default countMinutes;
