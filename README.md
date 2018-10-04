# Promise Limiter
Like Promise.all, but limits the number of functions running simultaneously.

## Example
```javascript
const PromiseLimit = require('promise-limiter');

const results = await PromiseLimit([1, 2, 3, 4, 5], 2, async (val) => {
  // Do some async stuff
  return val * val;
});

console.log(results);
// [1, 4, 9, 16, 25]
```

The second paramter can also be an options obj:
```javascript
PromiseLimit(arr, {
  ignoreErrors: true,
  limit: 3,
}, async () => {});
```

