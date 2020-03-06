import { always } from 'ramda';

const createMethod = method => resolver => always({ method, resolver });

export const GET = 'get';
export const POST = 'post';
export const PATCH = 'patch';
export const DELETE = 'delete';

export const get = createMethod(GET);
export const post = createMethod(POST);
export const del = createMethod(DELETE);
export const patch = createMethod(PATCH);
