import death from 'death';

const onDeath = fn => {
  const clear = death((...args) => {
    clear();

    return fn(args);
  });

  return clear;
};

const Death = async () => {
  return {
    death: onDeath,
  };
};

export default Death;
