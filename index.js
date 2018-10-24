const wait = async (t) => (
  new Promise(
    resolve => setTimeout(() => { resolve(); }, t),
  )
);

const PromiseLimit = async (arr, opts, fn) => {
  let limit;
  let ignoreErrors = false;

  if (typeof opts === 'object') {
    limit = opts.limit;
    ignoreErrors = opts.ignoreErrors;
  } else if (typeof opts === 'number') {
    limit = opts;
  }

  if (!limit) {
    throw new Error('Missing limit param');
  }

  let a = 0;
  const work = async (arg, i) => {
    a += 1;

    let results;
    try {
      results = await fn(arg, i);
    } catch (err) {
      if (!ignoreErrors) throw new Error(err);
    }

    a -= 1;
    return results;
  };

  const ret = [];
  for (let i = 0; i < arr.length; i += 1) {
    const arg = arr[i];

    if (a >= limit) {
      // Wait for no time. Allows other work to be done if needed.
      await wait();
      i -= 1;
      continue;
    }

    ret[i] = work(arg, i);
  }

  return Promise.all(ret);
}

module.exports = PromiseLimit;
