import { allPass, compose, not, propEq, when } from 'ramda';
import { isNotUndefined } from 'ramda-adjunct';
import { Either, Right } from 'monet';

export const isEither = allPass([isNotUndefined, Either.isOfType]);
export const isNotEither = compose(not, isEither);

export const isRight = allPass([isEither, propEq('isRightValue', true)]);
export const isLeft = allPass([isEither, propEq('isRightValue', false)]);

export const ensureEitherOr = when(isNotEither);
export const ensureEitherOrRight = ensureEitherOr(Right);
