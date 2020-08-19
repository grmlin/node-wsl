'use strict';

const ow = require('ow');
const { isString, isBoolean } = require('lodash');
const wsl = require('../wsl');

/**
 *
 *  Sets the distribution as the default.
 *
 * ```
 * wsl.exe  --set-default-version <Version>
 * ```
 *
 * @param {(1|2)} version version to set the distribution to
 * @param {Object} [options ={}] options passed to `execa`
 * @returns {Promise} Promise the result of calling `wsl.exe` with execa
 */

const setDefaultVersion = async (version, options = {}) => {
  ow(version, 'version', ow.number.oneOf([1, 2]));
  ow(options, 'options', ow.optional.object);

  const commandArgs = ['--set-default-version', version.toString()];

  return wsl(commandArgs, options);
};

module.exports = setDefaultVersion;
