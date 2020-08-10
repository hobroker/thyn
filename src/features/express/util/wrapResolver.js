import { always, anyPass, cond, curry, objOf, prop, T, when } from 'ramda';
import {
  isBoolean,
  isNull,
  isNumber,
  isString,
  isUndefined,
} from 'ramda-adjunct';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status-codes';
import { debugIt } from '../../../util/debug';

const formatOkResponse = when(
  anyPass([isString, isNumber, isNull, isUndefined, isBoolean]),
  objOf('data'),
);

const getHttpErrorCode = cond([
  [prop('code'), prop('code')],
  [T, always(INTERNAL_SERVER_ERROR)],
]);

const onSuccess = (data, { res }) => {
  const response = formatOkResponse(data);

  return res.status(OK).send(response);
};

const onError = (error, { res }) => {
  const code = getHttpErrorCode(error);

  debugIt(error);

  return res.status(code).send({
    error: {
      message: error.message,
    },
  });
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
