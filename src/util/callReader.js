import { apply, compose, identity, unapply } from 'ramda';
import { Reader } from 'monet';

const callReader = compose(Reader, unapply, apply, identity);

export default callReader;
