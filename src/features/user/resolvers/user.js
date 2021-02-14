import { andThen, compose, pick } from 'ramda';

export const findUser = filter => ({ mongo: { User } }) => User.findOne(filter);
export const createUser = data => ({ mongo: { User } }) => User.create(data);

export const findAlUsers = filter => ({ mongo: { User } }) => User.find(filter);

export const getJwtUserData = ({ userId }) =>
  compose(andThen(pick(['_id'])), findUser({ _id: userId }));
