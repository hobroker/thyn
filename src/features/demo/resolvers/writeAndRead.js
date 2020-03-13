import { debugIt } from '../../../util/debug';

const writeAndRead = () => async ({ mongo: { Demo } }) => {
  await Demo.create({ name: 'something' });
  debugIt(await Demo.find());
};

export default writeAndRead;
