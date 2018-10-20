/* global test, expect, describe */
require('..');
test('array has .advmap property', () => {
    expect([].__proto__['advmap']).toBeTruthy();
});
test('throws error if no function is provided', () => {
    expect(() => [].advmap({})).toThrow();
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
        const f1 = function() {
            this1 = this;
        };
        const f2 = function() {
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
    describe('default parameters', () => {
        test('current element', () => {
            let fparr = [];
            arr.advmap(e => fparr.push(e));
            expect(fparr).toEqual(arr);
        });
        test('index', () => {
            let sum1 = 0,
                sum2 = 0;
            arr.advmap((e, i) => (sum1 += i));
            for (let i = 0; i < arr.length; i++) sum2 += i;
            expect(sum1).toEqual(sum2);
        });
    });
});

describe('custom config', () => {
    const arr = [1, 2, 3, 4, 5];
    const objArr = [{ a: 1 }, { b: 2 }, { c: 3 }, { d: 4 }, { e: 5 }];
    const f = e => e + 1;

    describe('skip', () => {
        test('if skip is 0 nothing should change', () => {
            expect(arr.map(f)).toEqual(arr.advmap(f, { skip: 0 }));
            expect(objArr.map(f)).toEqual(objArr.advmap(f, { skip: 0 }));
        });
        test('if skip is between 0 and the array length', () => {
            expect(arr.slice(2).map(f)).toEqual(arr.advmap(f, { skip: 2 }));
            expect(objArr.slice(2).map(f)).toEqual(
                objArr.advmap(f, { skip: 2 })
            );
        });
        test('if skip is bigger than the array length', () => {
            expect(arr.slice(12).map(f)).toEqual(arr.advmap(f, { skip: 12 }));
            expect(objArr.slice(12).map(f)).toEqual(
                objArr.advmap(f, { skip: 12 })
            );
        });
    });
    describe('limit', () => {
        test('if limit is 0 nothing should change', () => {
            expect(arr.map(f)).toEqual(arr.advmap(f, { limit: 0 }));
            expect(objArr.map(f)).toEqual(objArr.advmap(f, { limit: 0 }));
        });
        test('if limit is between 0 and the array length', () => {
            expect(arr.slice(0, 2).map(f)).toEqual(arr.advmap(f, { limit: 2 }));
            expect(objArr.slice(0, 2).map(f)).toEqual(
                objArr.advmap(f, { limit: 2 })
            );
        });
        test('if limit is bigger than the array length', () => {
            expect(arr.slice(0, 12).map(f)).toEqual(
                arr.advmap(f, { limit: 12 })
            );
            expect(objArr.slice(0, 12).map(f)).toEqual(
                objArr.advmap(f, { limit: 12 })
            );
        });
    });
    describe('step', () => {
        test('if step is smaller or equal to 0 should throw error', () => {
            expect(() => {
                arr.advmap(f, { step: 0 });
            }).toThrow();
        });
        test('if step is bigger than the array length calculate only the first array value, [0]', () => {
            expect([arr[0]].map(f)).toEqual(arr.advmap(f, { step: 12 }));
            expect([objArr[0]].map(f)).toEqual(objArr.advmap(f, { step: 12 }));
        });
    });
    describe('reverse', () => {
        test('if step is smaller or equal to 0 should throw error', () => {
            expect(() => {
                arr.advmap(f, { step: 0 });
            }).toThrow();
        });
        test('if step is bigger than the array length calculate only the first array value, [0]', () => {
            expect([arr[0]].map(f)).toEqual(arr.advmap(f, { step: 12 }));
            expect([objArr[0]].map(f)).toEqual(objArr.advmap(f, { step: 12 }));
        });
    });
    describe('custom parameters', () => {
        describe('before the default parameter', () => {
            test('returns `undefined` if it exceeds array boundaries', () => {
                const res = [undefined, ...arr.slice(0, arr.length - 1)];
                let newRes = [];
                arr.advmap(
                    e0 => {
                        newRes.push(e0);
                    },
                    { previousParamsCount: 1 }
                );
                expect(newRes).toEqual(res);
            });
        });
        describe('after the default parameter', () => {
            test('returns `undefined` if it exceeds array boundaries', () => {
                const res = [...arr.slice(1, arr.length), undefined];
                let newRes = [];
                arr.advmap(
                    (e, e0) => {
                        newRes.push(e0);
                    },
                    { nextParamsCount: 1 }
                );
                expect(newRes).toEqual(res);
            });
        });
    });
    describe('check function', () => {
        test('has the same parameters as the map function parameter', () => {
            let arg1 = [],
                arg2 = [];
            arr.advmap(
                () => {
                    arg1.push(arguments);
                    return true;
                },
                () => {
                    arg2.push(arguments);
                }
            );
            expect(arg1).toEqual(arg2);
        });
        test('skips elements if it returns falsy', () => {
            expect(arr.slice(1).map(f)).toEqual(
                arr.advmap((e, i, ii) => ii >= 1, f)
            );
            expect(objArr.slice(1).map(f)).toEqual(
                objArr.advmap((e, i, ii) => ii >= 1, f)
            );
        });
    });
});
