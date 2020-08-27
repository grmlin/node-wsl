'use strict';

const ow = require('ow');
const wsl = require('../wsl');

/**
 *
 *  Shuts down the selected distribution
 * ```
 * wsl.exe  --terminate <Distribution>
 * ```
 *
 * @param {string} distribution name of the distribution
 * @param {execa.Options} [options={}] options passed to `execa`
 * @returns {execa.ExecaChildProcess} execa child_process instance
 */
const terminate = async (distribution, options = {}) => {
  ow(distribution, 'distribution', ow.string.not.empty);
  ow(options, 'options', ow.optional.object);

  const commandArgs = ['--terminate', distribution];

  return wsl(commandArgs, options);
};

module.exports = terminate;
