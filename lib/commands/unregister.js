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
 * @param {Object} [options ={}] options passed to `execa`
 * @returns {Promise} Promise the result of calling `wsl.exe` with execa
 */

const unregister = async (distribution, options = {}) => {
  ow(distribution, 'distribution', ow.string.not.empty);
  ow(options, 'options', ow.optional.object);

  const commandArgs = ['--unregister', distribution];

  return wsl(commandArgs, options);
};

module.exports = unregister;
