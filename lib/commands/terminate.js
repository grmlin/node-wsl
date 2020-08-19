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
 * @param {Object} [options ={}] options passed to `execa`
 * @returns {Promise} Promise the result of calling `wsl.exe` with execa
 */

const terminate = async (distribution, options = {}) => {
  ow(distribution, 'distribution', ow.string.not.empty);
  ow(options, 'options', ow.optional.object);

  const commandArgs = ['--terminate', distribution];

  return wsl(commandArgs, options);
};

module.exports = terminate;
