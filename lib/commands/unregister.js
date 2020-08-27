'use strict';

const ow = require('ow');
const wsl = require('../wsl');

/**
 *
 * Unregister the selected distribution
 * ```
 * wsl.exe  --unregister <Distribution>
 * ```
 *
 * @param {string} distribution name of the distribution
 * @param {execa.Options} [options={}] options passed to `execa`
 * @returns {execa.ExecaChildProcess} execa child_process instance
 */
const unregister = async (distribution, options = {}) => {
  ow(distribution, 'distribution', ow.string.not.empty);
  ow(options, 'options', ow.optional.object);

  const commandArgs = ['--unregister', distribution];

  return wsl(commandArgs, options);
};

module.exports = unregister;
