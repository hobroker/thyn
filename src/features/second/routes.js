import { get } from '../express/methods';

const hello = (/* app, { req, res } */) => 'hello';

export const routes = [get('/', hello)];
