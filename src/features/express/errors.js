/* eslint-disable max-classes-per-file */
import { BAD_REQUEST, UNAUTHORIZED } from 'http-status-codes';

class ExtendableError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }
}

export class UnauthorizedError extends ExtendableError {
  code = UNAUTHORIZED;

  constructor(message = 'Unauthorized') {
    super(message);
  }
}

export class BadRequestError extends ExtendableError {
  code = BAD_REQUEST;

  constructor(message = 'Bad request') {
    super(message);
  }
}
