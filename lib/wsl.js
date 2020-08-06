'use strict';
const ow = require('ow');
const { isString } = require('lodash');
const execa = require('execa');

// const { isString, map } = require('lodash');
/**
 * wrapper for the `wsl.exe` cli of the windows subsystem for linux
 */

/**
 * builds and executes a wsl call using `execa`
 *
 * @async
 * @example
 * executeCommand(['--list', '--verbose']) // calls wsl.exe --list --verbose
 * @param {string[]} args arguments passed to `wsl.exe`. An array strings used with `spawnSync`. Undefined and empty strings will be removed
 * @returns {string} the result of calling `wsl.exe`
 */
const executeCommand = async (args) => {
  ow(args, 'arguments', ow.array);

  const wslArguments = args.filter((arg) => isString(arg) && arg !== '');
  const { stdout } = await execa('wsl.exe', wslArguments);
  return stdout.toString();
};

/**
 * Run a command inside a distro with `wsl.exe`
 *
 * * ```
 * wsl.exe [arguments] <CommandLine>
 * ```
 *
 * @async
 * @param {string} command The command to execute inside the targeted wsl distribution
 * @param {Object} options
 * @param {string} options.distribution  Run the specified distribution. If missing the default distribution will be used
 * @param {string} options.user Run as the specified user.
 */
const run = async (command, options = {}) => {
  const { distribution, user } = options;
  ow(command, 'command', ow.string.not.empty);
  ow(distribution, 'distribution', ow.optional.string);
  ow(user, 'user', ow.optional.string);

  const args = [
    ...(isString(distribution) ? ['--distribution', distribution] : []),
    ...(isString(user) ? ['--user', user] : []),
    command
  ];

  return executeCommand(args);
};

/**
 * Export a distribution into a file
 *
 * `wsl.exe --export <distribution> <fileName>`
 *
 * @async
 * @param {string} distribution name of the distribution
 * @param {string} fileName path/filename. Will be a `.tar`
 */
const exportDistribution = async (distribution, fileName) => {
  ow(distribution, 'distribution', ow.string.not.empty);
  ow(fileName, 'fileName', ow.string.not.empty);

  return executeCommand(['--export', distribution, fileName]);
};

exports.executeCommand = executeCommand;
exports.run = run;
exports.exportDistribution = exportDistribution;
