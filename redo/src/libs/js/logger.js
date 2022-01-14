/**
 * Use this for non-development logging.
 */
function logger(...args) {
  /* eslint-disable no-console */
  return console.log(...args);
  /* eslint-enable no-console */
}

export logger
