import countMinutes, { getDiffInMinutes } from '../countMinutes';

const consecutiveList = [
  { createdAt: '2020-04-08 02:00:00' },
  { createdAt: '2020-04-08 02:01:00' },
  { createdAt: '2020-04-08 02:02:00' },
  { createdAt: '2020-04-08 02:03:00' },
];

const nonConsecutiveList = [
  { createdAt: '2020-04-08 02:00:00' },
  { createdAt: '2020-04-08 02:01:00' },
  { createdAt: '2020-04-08 02:02:00' },
  { createdAt: '2020-04-08 02:10:00' },
  { createdAt: '2020-04-08 02:11:00' },
];

describe('getDiffInMinutes', () => {
  it('should return expected diff in minutes in a list of consecutive dates', () => {
    expect(getDiffInMinutes(consecutiveList)).toEqual([1, 1, 1]);
  });
  it('should return expected diff in minutes in a list of non-consecutive dates', () => {
    expect(getDiffInMinutes(nonConsecutiveList)).toEqual([1, 1, 8, 1]);
  });
});

describe('getDiffInMinutes', () => {
  it('should count minutes in a list of consecutive dates', () => {
    expect(countMinutes(consecutiveList)).toEqual(3);
  });
  it('should count minutes in a list of non-consecutive dates', () => {
    expect(countMinutes(nonConsecutiveList)).toEqual(4);
  });
});
