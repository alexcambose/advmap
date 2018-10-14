(() => {
  Array.prototype.advmap = function(callback, config, thisp) {
    const _this = Object(this);
    // if `this` parameter is not specified use this
    if (!thisp) thisp = _this;
    // check if callback is provided
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    // get config with the defaults
    const {
      skip = 0,
      limit = 0,
      reversed = false,
      step = 1,
      args: { previous = 0, next = 0 } = {},
    } = config || {};

    //define some vars
    let arr = [],
      previousParams = [],
      nextParams = [],
      start,
      end,
      currentIndex;
    //set start index, if skip skip is not provided start at 0
    start = skip || 0;
    //set end index, minimum between the total length and the start + limit so we will never go over the array lenght
    //if start + limit is 0 then it means we should use the default array length
    end = Math.min(start + limit, _this.length) || _this.length;
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
// const a = [1, 2, 3, 4];
// const f = function(e) {
//   return e + 1;
// };
// const b = a.advmap(f);
// console.log(b);
