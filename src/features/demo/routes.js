import { DEMO } from './constants';
import { get } from '../express/methods';

export const prefix = DEMO;

const hello = (/* app, { req, res } */) => 'hello';

export const routes = [get('/', hello)];
