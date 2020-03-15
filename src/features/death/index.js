import death from 'death';

const onDeath = fn => {
  const clear = death((...args) => {
    clear();

    return fn(args);
  });

  return clear;
};

const Death = async () => {
  onDeath(() => {
    setTimeout(() => {
      process.exit(0);
    }, 1000);
  });

  return {
    death: onDeath,
  };
};

export default Death;
