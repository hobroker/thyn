import oxi from 'oxium/src/util/oxi';
import config from '../src/config';

export const mockOxi = (data = {}) =>
  oxi({
    config,
    ...data,
  });
