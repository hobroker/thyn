import { apply, compose, identity, unapply } from 'ramda';
import { Reader } from 'monet';

export const callReader = compose(Reader, unapply, apply, identity);
