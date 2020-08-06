export const findUser = filter => ({ mongo: { User } }) => User.findOne(filter);
export const createUser = data => ({ mongo: { User } }) => User.create(data);
