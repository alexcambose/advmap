(() => {
  Array.prototype.advmap = function(callback, config, thisp) {
    const _this = Object(this);
    if (!thisp) thisp = _this;

    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    const {
      skip = 0,
      limit = 0,
      reversed = false,
      step = 1,
      args: { previous = 0, next = 0 } = {},
    } = config;

    let arr = [],
      previousParams = [],
      nextParams = [],
      start,
      end,
      currentIndex;
    start = skip || 0;
    end = Math.min(start + limit, _this.length);
    if (reversed) start = [end, (end = start)][0];
    for (let i = start; i < end; i += step) {
      currentIndex = i - start;
      // for previous params
      for (let j = i - 1; j >= 0 && Math.abs(i - j) <= previous; j--)
        previousParams.push(_this[j]);
      // for next params
      for (let j = i + 1; j >= end && Math.abs(i - j) <= next; j++)
        nextParams.push(_this[j]);
      arr[currentIndex] = callback.call(
        thisp,
        ...[...previousParams, _this[currentIndex], ...nextParams],
        currentIndex
      );
    }
    return arr;
  };
})();
const a = [1, 2, 3, 4];
const b = a.advmap(
  function(e, ee) {
    console.log(arguments);
    return 'l';
  },
  { skip: 0, limit: 3 },
  'a'
);
// console.log(b);
