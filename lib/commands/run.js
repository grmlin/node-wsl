'use strict';

const ow = require('ow');
const { isString } = require('lodash');
const wsl = require('../wsl');

/**
 * Run a command inside a distro with `wsl.exe`
 *
 * ```
 * wsl.exe [arguments] <CommandLine>
 * ```
 *
 * @async
 * @param {string} command The command to execute inside the targeted wsl distribution
 * @param {object} [args={}] optional arguments object
 * @param {string} [args.distribution]  Run the specified distribution. If missing the default distribution will be used
 * @param {string} [args.user] Run as the specified user.
 * @param {execa.Options} [options={}] options passed to `execa`
 * @returns {execa.ExecaChildProcess} execa child_process instance
 *
 */
const run = async (command, args = {}, options = {}) => {
  const { distribution, user } = args;
  ow(command, 'command', ow.string.not.empty);
  ow(distribution, 'distribution', ow.optional.string);
  ow(user, 'user', ow.optional.string);
  ow(options, 'options', ow.optional.object);

  const commandArgs = [
    ...(isString(distribution) ? ['--distribution', distribution] : []),
    ...(isString(user) ? ['--user', user] : []),
    ...command.split(' ')
  ];

  return wsl(commandArgs, options);
};

module.exports = run;
