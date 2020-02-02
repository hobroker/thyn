import { compose, omit, values } from 'ramda';

const esModuleValues = compose(values, omit(['__esModule']));

export default esModuleValues;
