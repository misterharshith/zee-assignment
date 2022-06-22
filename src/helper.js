export const debounce = (func, delay = 500) => {
    let debounceTimer;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func && func.apply(context, args), delay);
    };
  };