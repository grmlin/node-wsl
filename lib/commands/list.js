'use strict';

const ow = require('ow');
const { isString, isBoolean } = require('lodash');
const wsl = require('../wsl');

/**
 *
 *  Lists distributions.
 *
 * ```
 * wsl.exe --list [options]
 * ```
 *
 *  Options:
 *      --all
 *         List all distributions, including distributions that are currently being installed or uninstalled.
 *      --running
 *         List only distributions that are currently running.
 *      --quiet, -q
 *          shows distribution names only
 *      --verbose, -v
 *          shows detailed distribution informations
 *
 * @param {*} command
 * @param {Object} [args={}] optional argumants object
 * @param {boolean} [args.all]   List all distributions
 * @param {boolean} [args.running]  List only distributions that are currently running.
 * @param {boolean} [args.quiet]  shows distribution names only
 * @param {boolean} [args.verbose]  shows detailed distribution informations
 * @param {Object} [options ={}] options passed to `execa`
 * @returns {Promise} Promise the result of calling `wsl.exe` with execa
 */

const list = async (args = {}, options = {}) => {
  const { all, running, quiet, verbose } = args;
  ow(args, 'args', ow.optional.object);
  ow(all, 'all', ow.optional.boolean);
  ow(running, 'running', ow.optional.boolean);
  ow(quiet, 'quiet', ow.optional.boolean);
  ow(verbose, 'verbose', ow.optional.boolean);
  ow(options, 'options', ow.optional.object);

  if (isBoolean(running) && running && isBoolean(all) && all) {
    throw new ow.ArgumentError(
      "list: you can't list both all distributions and only the ones that are running"
    );
  }

  if (isBoolean(quiet) && quiet && isBoolean(verbose) && verbose) {
    throw new ow.ArgumentError("list: you can't combine quiet with verbose");
  }

  const commandArgs = [
    '--list',
    ...(isBoolean(all) && all ? ['--all'] : []),
    ...(isBoolean(running) && running ? ['--running'] : []),
    ...(isBoolean(quiet) && quiet ? ['--quiet'] : []),
    ...(isBoolean(verbose) && verbose ? ['--verbose'] : [])
  ];

  return wsl(commandArgs, options);
};

module.exports = list;
