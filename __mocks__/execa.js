/* global jest */

'use strict';

const { isEqual } = require('lodash');

module.exports = jest.fn(async (file, command) => {
  if (
    file === 'wsl.exe' &&
    isEqual(command, ['--list', '--all', '--verbose'])
  ) {
    return {
      stdout: `  NAME                   STATE           VERSION
      * Debian-DEV             Running         2
        kali-linux             Stopped         2
        docker-desktop-data    Running         2
        docker-desktop         Running         2
        Ubuntu                 Stopped         2
        Debian                 Running         2
      `
    };
  }
  if (Array.isArray(command) && command[0] === 'unknown') {
    throw new TypeError('execa failed');
  }

  return { stdout: `${file} ${command.join(' ')}` };
});
