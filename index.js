(() => {
  Array.prototype.advmap = function(callback, config, thisp) {
    let _this = Object(this);
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
      step = 1,
      previousParamsCount = 0,
      nextParamsCount = 0,
    } = config || {};

    // perform some checks on the config
    if (step === 0 || step < 0) {
      throw new TypeError(`The value ${step} for step must be bigger than 0.`);
    }

    //define some vars
    let arr = [],
      previousParams = [],
      nextParams = [],
      start,
      end,
      currentArrayIndex,
      newArrayIndex = 0;
    //set start index, if skip skip is not provided start at 0
    start = skip || 0;
    //set end index, minimum between the total length and the start + limit so we will never go over the array lenght
    //if limit is 0 then it means we should use the default array length
    end = limit ? Math.min(start + limit, _this.length) : _this.length;

    for (let i = start; i < end; i += step) {
      previousParams = new Array(previousParamsCount);
      nextParams = [];
      currentArrayIndex = i - start;
      // for previous params

      for (let j = i - 1; j >= 0 && Math.abs(i - j) <= previousParamsCount; j--)
        previousParams.push(_this[previousParamsCount - Math.abs(i - j)]);

      // for next params
      for (let j = i + 1; j >= end && Math.abs(i - j) <= nextParamsCount; j++)
        nextParams.push(_this[j]);

      arr[newArrayIndex] = callback.call(
        thisp,
        ...[...previousParams, _this[i], ...nextParams],
        newArrayIndex++,
        currentArrayIndex
      );
    }
    return arr;
  };
})();

const a = [1, 2, 3, 4];
const f = function(e0, e, i, i2) {
  console.log(e0, e);
  return e;
};
const b = a.advmap(f, { previousParamsCount: 1 });
// console.log(b);
