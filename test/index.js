import oxi from 'oxium/src/util/oxi';
import { always } from 'ramda';
import config from '../src/config';
import Express from '../src/features/express';
import features from '../src/features';
import { findTokenWithUser } from '../src/features/user/resolvers/token';
import { mockedUsersById } from './__mocks__/users';

jest.mock('../src/features/user/resolvers/token');
jest.mock('dotenv', () => ({
  __esModule: true,
  default: {
    config: () => ({
      parsed: {
        NODE_ENV: 'test',
      },
    }),
  },
}));

export const mockOxi = (data = {}) =>
  oxi({
    config,
    ...data,
  });

export const mockExpress = () => {
  const { express } = Express(mockOxi(), features);

  return express;
};

export const mockFindToken = user => {
  beforeAll(() => {
    findTokenWithUser.mockImplementation(token => () =>
      Promise.resolve(user || mockedUsersById[token]),
    );
  });

  afterAll(() => {
    findTokenWithUser.mockClear();
  });
};
