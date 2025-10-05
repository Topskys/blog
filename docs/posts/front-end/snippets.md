# 片段

速记代码片段

##

## 使用Date处理时间可能发生异常

为什么使用Date处理时间会发生异常？

```js

```

## 手写 Promise.all

```js
/**
 * 实现 Promise.all
 *
 * @param {Array} promises
 * @return {Promise<any>}
 */
Promise.prototype.myAll = function (promises) {
  let count = 0;
  const result = [];
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then((res) => {
        result[i] = res;
        count++;
        if (count === promises.length) {
          resolve(result);
        }
      }, reject);
    }
  });
};
```

## 控制并发数量

当需要处理大量异步操作时，可以使用并发控制来避免资源耗尽

```js
async function runWithConcurrency(tasks, limit = 6) {
  const results = [];
  const executing = new Set();

  for (const task of tasks) {
    if (executing.size >= limit) {
      await Promise.race(executing);
    }

    const promise = task().then((result) => {
      results.push(result);
      executing.delete(promise);
    });

    executing.add(promise);
  }

  await Promise.all(executing);
  return results;
}
```

## async/await如何实现？

```js
function asyncToGenerator(generatorFunc) {
  return function () {
    const gen = generatorFunc.apply(this, arguments);

    return new Promise((resolve, reject) => {
      function step(key, arg) {
        let generatorResult;

        try {
          generatorResult = gen[key](arg);
        } catch (error) {
          return reject(error);
        }

        const { value, done } = generatorResult;

        if (done) {
          return resolve(value);
        } else {
          return Promise.resolve(value).then(
            (value) => step("next", value), // 递归调用step函数，传入"next"和value
            (err) => step("throw", err)
          );
        }
      }

      step("next");
    });
  };
}
```
example:
```js
function* foo() {
  const a = yield 1;
  const b = yield a + 2;
  return b;
}

const asyncFoo = asyncToGenerator(foo);

asyncFoo().then((res) => console.log(res)); // 4
```

## 手写Object.create

描述：创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。

```js
function create(proto) {
  function F() {}
  F.prototype = proto;
  return new F();
}
```




## 函数柯里化

```js
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}
```

## 柯里化实现bind

```js
Function.prototype.bind = function (context, ...args) {
  const fn = this;
  return function (...args2) {
    return fn.apply(context, args.concat(args2));
  };
};
```
