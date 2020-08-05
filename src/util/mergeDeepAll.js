import { mergeDeepRight, reduce } from 'ramda';

const mergeDeepAll = reduce(mergeDeepRight, {});

export default mergeDeepAll;
