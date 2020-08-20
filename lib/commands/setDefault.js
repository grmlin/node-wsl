'use strict';

const ow = require('ow');
const wsl = require('../wsl');

/**
 *
 *  Sets the distribution as the default.
 *
 * ```
 * wsl.exe --set-default <Distro>
 * ```
 *
 * @param {string} distribution name of the distribution
 * @param {Object} [options ={}] options passed to `execa`
 * @returns {Promise} Promise the result of calling `wsl.exe` with execa
 */
const setDefault = async (distribution, options = {}) => {
  ow(distribution, 'distribution', ow.string.not.empty);
  ow(options, 'options', ow.optional.object);

  const commandArgs = ['--set-default', distribution];

  return wsl(commandArgs, options);
};

module.exports = setDefault;
