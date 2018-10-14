require('..');
test('array has .advmap property', () => {
  expect([].__proto__['advmap']).toBeTruthy();
});
describe('should behave like the native version', () => {
  let arr = [1, 2, 3, 4];
  test('maps values', () => {
    const f = e => e + 1;
    expect(arr.map(f)).toEqual(arr.advmap(f));
  });
  test('has an index parameter', () => {
    const f = (e, i) => e + i;
    expect(arr.map(f)).toEqual(arr.advmap(f));
  });
  test('can bind custom `this`', () => {
    let this1,
      this2,
      thisValue = 'Something';
    const f1 = function(e) {
      this1 = this;
    };
    const f2 = function(e) {
      this2 = this;
    };
    arr.map(f1, thisValue);
    arr.advmap(f2, null, thisValue);
    expect(this1).toEqual(this2);
  });
  test('behaves like `map` if no config is provided', () => {
    const f = e => e + 1;
    expect(arr.map(f)).toEqual(arr.advmap(f, {}));
  });
});

describe('custom config', () => {
  const arr = [1, 2, 3, 4, 5];
  const obj = [{ a: 1 }, { b: 2 }, { c: 3 }, { d: 4 }, { e: 5 }];
  describe('skip', () => {
    const f = e => e + 1;

    test('if skip is 0 nothing should change', () => {
      expect(arr.map(f)).toEqual(arr.advmap(f, { skip: 0 }));
    });
    test('if skip is between 0 and the array length', () => {
      expect(arr.slice(2).map(f)).toEqual(arr.advmap(f, { skip: 2 }));
    });
  });
});
