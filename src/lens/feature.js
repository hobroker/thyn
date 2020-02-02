import { compose, lensProp, not, set, view } from 'ramda';

const defaultLens = lensProp('default');

const weaveLens = lensProp('weave');
const defaultWeaveLens = compose(weaveLens, defaultLens);

const metaLens = lensProp('_');
const isLoadedLens = lensProp('isLoaded');
const resultLens = lensProp('result');
const metaIsLoadedLens = compose(metaLens, isLoadedLens);
const metaResultLens = compose(metaLens, resultLens);

const sharedLens = lensProp('shared');

const getWeave = view(weaveLens);
const setDefaultWeave = set(defaultWeaveLens);

const getMeta = view(metaLens);
const isFeatureLoaded = view(metaIsLoadedLens);
const isFeatureUnloaded = compose(not, isFeatureLoaded);
const setFeatureIsLoaded = set(metaIsLoadedLens);
const setHandlerResult = set(metaResultLens);
const setDefaultMeta = setFeatureIsLoaded(false);

export {
  defaultLens,
  weaveLens,
  defaultWeaveLens,
  metaLens,
  isLoadedLens,
  resultLens,
  metaIsLoadedLens,
  metaResultLens,
  sharedLens,
};

export {
  getWeave,
  setDefaultWeave,
  getMeta,
  isFeatureLoaded,
  isFeatureUnloaded,
  setFeatureIsLoaded,
  setHandlerResult,
  setDefaultMeta,
};
