# advmap

[![Build Status](https://travis-ci.org/alexcambose/advmap.svg?branch=master)](https://travis-ci.org/alexcambose/advmap)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

`[...].map()` that supports skip, limit, step and more

![logo](logo.png)

## Installation

As [npm](https://www.npmjs.com/package/advmap) package

```
npm i -S advmap
```

Importing the module. It will automatically add a method to the [array prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype).

```js
require('advmap');
// or
import 'advmap';
```

# Table of Contents

- [Configuration](#configuration)

  - [Skip](#skip)
  - [Limit](#limit)
  - [Step](#step)
  - [previousParamsCount](#previous-params)
  - [nextParamsCount](#next-params)

- [Examples](#examples)

## Configuration

### Skip

`skip` controls how many items to skip before returning results

Example:

```js
const array = [1, 2, 3, 4, 5].advmap(e => e, { skip: 2 });
console.log(array); // [3, 4, 5]
```

### Limit

`limit` controls the maximum number of items returned

Example:

```js
const array = [1, 2, 3, 4, 5].advmap(e => e, { limit: 2 });
console.log(array); // [1, 2]
```

it can be nicely combined with the `skip` property to create a pagination

```js
const array = [1, 2, 3, 4, 5].advmap(e => e, { limit: 2, skip: 2 });
console.log(array); // [3, 4]
```

### Step

controls the interval between two adjacent elements

```js
const array = [1, 2, 3, 4, 5].advmap(e => e, { step: 2 });
console.log(array); // [1, 3, 5]

// if step is bigger than the array length it returns only the first element
const array = [1, 2, 3, 4, 5].advmap(e => e, { step: 10 });
console.log(array); // [1]
```

it also provides an additional index parameter that is the actual array index that is being mapped

```js
[1, 2, 3, 4, 5].advmap((e, i, ii) => console.log(e, i, ii), { step: 2 });
/*
last parameter is where the item (e) is located in the array
[1, 0, 0]
[3, 1, 2]
[5, 2, 4]
*/
[1, 2, 3, 4, 5].advmap((e, i, ii) => console.log(e, i, ii), { step: 1 });
/*
If step is set to 1 (default) index parameters will be the same
[1, 0, 0]
[2, 1, 1]
[3, 2, 2]
[4, 3, 3]
[5, 4, 4]
*/
```

### Previous params

adds a number of fixed parameters to the `advmap` method, before the current element

```js
[1, 2, 3, 4, 5].advmap((p2, p1, e) => console.log(p2, p1, e), {
  previousParamsCount: 2,
});
/*
[undefined, undefined, 1]
[undefined, 1, 2]
[1, 2, 3]
[2, 3, 4]
[3, 4, 5]
*/
```

elements that are outsite of the array are `undefined`

### Next params

adds a number of fixed parameters to the `advmap` method, after the current element

```js
[1, 2, 3, 4, 5].advmap((e, p1, p2) => console.log(e, p1, p2), {
  nextParamsCount: 2,
});
/*
[1, 2, 3]
[2, 3, 4]
[3, 4, 5]
[4, 5, undefined]
[5, undefined, undefined]
*/
```

elements that are outsite of the array are `undefined`

### Previous and next params combined

```js
[1, 2, 3, 4, 5].advmap((p1, e, n2, n1) => console.log(p1, e, n2, n1), {
  previousParamsCount: 1,
  nextParamsCount: 2,
});
/*
[undefined, 1, 2, 3]
[1, 2, 3, 4]
[2, 3, 4, 5]
[3, 4, 5, undefined]
[4, 5, undefined, undefined]
*/
```

## Examples

### Simple usage like the native `[].map` function

```js
const array = [1, 2, 3, 4].advmap(e => e + 1);
console.log(array); // [2,3,4,5]
```

---

## License

[MIT](LICENSE)
