import { always, anyPass, cond, curry, identity, objOf, prop, T } from 'ramda';
import { isBoolean, isNull, isNumber, isUndefined } from 'ramda-adjunct';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status-codes';
import { debugIt } from '../../../util/debug';

const formatOkResponse = cond([
  [anyPass([isNumber, isNull, isUndefined, isBoolean]), objOf('data')],
  [T, identity],
]);

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

const wrapResolver = curry(async (oxi, fn, req, res) => {
  const params = { req, res };
  try {
    const response = await fn(oxi, params);

    if (res.headersSent) {
      return null;
    }

    return onSuccess(response, params);
  } catch (error) {
    return onError(error, params);
  }
});

export default wrapResolver;
