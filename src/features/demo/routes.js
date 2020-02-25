import { DEMO } from './constants';
import { get } from '../express/methods';

const hello = () => 'hello';

export const prefix = DEMO;

export const routes = [get('/', hello)];
