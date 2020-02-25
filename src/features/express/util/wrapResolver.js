import { always, anyPass, cond, curry, objOf, propEq, T, when } from 'ramda';
import { isNull, isNumber, isString, isUndefined } from 'ramda-adjunct';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from 'http-status-codes';
import { createDebug } from '../../../util/debug';
import { EXPRESS } from '../constants';

const debugIt = createDebug(`${EXPRESS}:resolver`);

const formatOkResponse = when(
  anyPass([isString, isNumber, isNull, isUndefined]),
  objOf('data'),
);

const getHttpErrorCode = cond([
  [propEq('name', 'ValidationError'), always(BAD_REQUEST)],
  [T, always(INTERNAL_SERVER_ERROR)],
]);

const onSuccess = (data, { res }) => {
  const response = formatOkResponse(data);

  return res.status(OK).send(response);
};

const onError = (error, { res }) => {
  const code = getHttpErrorCode(error);

  debugIt('error', code, error);

  return res.status(code).send(error);
};

const wrapResolver = curry(async (arg, fn, req, res) => {
  const params = { req, res };
  try {
    const response = await fn(arg, params);

    if (res.headersSent) {
      return null;
    }

    return onSuccess(response, params);
  } catch (error) {
    return onError(error, params);
  }
});

export default wrapResolver;
