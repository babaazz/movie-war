const debounce = (func, delay = 500) => {
  let timer;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};
