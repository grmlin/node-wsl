'use strict';

const ow = require('ow');
const { isString } = require('lodash');
const execa = require('execa');

/**
 * wrapper for the `wsl.exe` cli of the windows subsystem for linux
 *
 * uses execa for process execution.
 * @see https://github.com/sindresorhus/execa
 */

/**
 * builds and executes a wsl call using `execa`
 *
 * @async
 * @example
 * executeCommand(['--list', '--verbose']) // calls wsl.exe --list --verbose
 * @param {string[]} args arguments passed to `wsl.exe`. An array strings used with `spawnSync`. Undefined and empty strings will be removed
 * @param {Object} [options={}] options passed to `execa`
 * @returns {Promise} Promise the result of calling `wsl.exe` with execa
 */
const wsl = async (args, options = {}) => {
  ow(args, 'arguments', ow.array);

  const wslArguments = args.filter((arg) => isString(arg) && arg !== '');
  const result = await execa('wsl.exe', wslArguments, options);
  return result;
};

module.exports = wsl;
