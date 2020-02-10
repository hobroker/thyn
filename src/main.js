import createApp from './createApp';
import config from './config';
import * as features from './features';

const app = createApp({ config, features });

app();
