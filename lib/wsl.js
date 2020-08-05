'use strict';
const ow = require('ow');
const { isString } = require('lodash');
const { execSync } = require('child_process');

// const { isString, map } = require('lodash');
/**
 * wrapper for the `wsl.exe` cli of the windows subsystem for linux
 */

/**
 * builds and executes a wsl call using `spawnSync`
 *
 * @example
 * executeCommand(['--list', '--verbose']) // calls wsl.exe --list --verbose
 * @param {string[]} args arguments passed to `wsl.exe`. An array strings used with `spawnSync`. Undefined and empty strings will be removed
 * @returns {string} the result of calling `wsl.exe`
 */
const executeCommand = (args) => {
  ow(args, ow.array);

  const wslArguments = args.filter((arg) => isString(arg) && arg !== '');
  console.log({ wslArguments });
  try {
    const response = execSync(`wsl.exe ${wslArguments.join(' ')}`);
    return response.toString();
  } catch (err) {
    console.log('TODO The command failed');
    throw err;
  }
};

/**
 *
 * ```
 * wsl.exe [arguments] <CommandLine>
 * ```
 *
 * @param {string} command The command to execute inside the targeted wsl distribution
 * @param {Object} options
 * @param {string} options.distribution  Run the specified distribution. If missing the default distribution will be used
 * @param {string} options.user Run as the specified user.
 */
const run = (command, options = {}) => {
  const { distribution, user } = options;
  ow(command, ow.string.not.empty);
  ow(distribution, ow.optional.string);
  ow(user, ow.optional.string);

  const args = [
    ...(isString(distribution) ? ['--distribution', distribution] : []),
    ...(isString(user) ? ['--user', user] : []),
    command
  ];

  return executeCommand(args);
};

exports.run = run;
