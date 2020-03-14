const wait = ms =>
  new Promise(r => {
    setTimeout(() => r(ms), ms);
  });

export default wait;
