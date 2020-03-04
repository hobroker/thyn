import { weave } from 'ramda-adjunct';
import { Reader } from 'monet';
import { apply, compose, identity, unapply } from 'ramda';

const callReader = compose(Reader, unapply, apply, identity);

const weaveReader = weave(callReader);

export default weaveReader;
