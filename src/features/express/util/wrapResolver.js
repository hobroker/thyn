import {
  always,
  anyPass,
  cond,
  curry,
  identity,
  objOf,
  propEq,
  T,
} from 'ramda';
import { isNumber, isString } from 'ramda-adjunct';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from 'http-status-codes';
import { createDebug } from '../../../util/debug';
import { EXPRESS } from '../constants';

const debugIt = createDebug(`${EXPRESS}:resolver`);

const formatOkResponse = cond([
  [anyPass([isString, isNumber]), objOf('data')],
  [T, identity],
]);

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

const wrapResolver = curry(async (app, fn, req, res) => {
  const params = { req, res };
  try {
    const response = await fn(app, params);

    if (res.headersSent) {
      return null;
    }

    return onSuccess(response, params);
  } catch (error) {
    return onError(error, params);
  }
});

export default wrapResolver;
