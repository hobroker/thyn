import getCurrentState from './getCurrentState';
import saveCurrentState from './saveCurrentState';

const syncState = () => async oxi => {
  const data = await oxi(getCurrentState());

  return oxi(saveCurrentState(data));
};

export default syncState;
