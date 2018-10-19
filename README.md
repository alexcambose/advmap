# advmap

[![Build Status](https://travis-ci.org/alexcambose/advmap.svg?branch=master)](https://travis-ci.org/alexcambose/advmap)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

`[...].map()` that supports skip, limit, step and more

![logo](logo.png)

## Installation

As npm package

```
npm i -S advmap
```

Importing the module. It will automatically add a function to the [array prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype)

```js
require('advmap');
// or
import 'advmap';
```

# Table of Contents

- Configuration

  - [Skip](#skip)
  - [Limit](#limit)
  - [Step](#step)
  - [previousParams](#previousParams)
  - [nextParams](#nextParams)

- Examples

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

## Examples

### Simple usage like the native `[].map` function

```js
const array = [1, 2, 3, 4].advmap(e => e + 1);
console.log(array); // [2,3,4,5]
```
