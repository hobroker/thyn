import getCurrentState from './getCurrentState';
import saveCurrentState from './saveCurrentState';

const syncState = () => async oxi => {
  const data = await oxi(getCurrentState());

  if (!data) {
    return null;
  }

  return oxi(saveCurrentState(data));
};

export default syncState;
