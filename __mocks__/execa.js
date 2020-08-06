/* global jest */
'use strict';

module.exports = jest.fn(async (file, command) => {
  if (Array.isArray(command) && command[0] === 'unknown') {
    throw new TypeError('execa failed');
  }

  return { stdout: `${file} ${command.join(' ')}` };
});
