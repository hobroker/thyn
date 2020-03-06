const invariant = (condition, message, ...args) => {
  if (!condition) {
    let idx = 0;

    // eslint-disable-next-line no-plusplus
    throw new Error(message.replace(/%s/g, () => args[idx++]));
  }
};

export default invariant;
