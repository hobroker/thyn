import death from 'death';

const onDeath = fn => {
  const clear = death((...args) => {
    clear();

    return fn(args);
  });
};

const Death = async () => {
  return {
    death: onDeath,
  };
};

export default Death;
