'use strict';

const ow = require('ow');
const { isString, isBoolean } = require('lodash');
const wsl = require('../wsl');

/**
 *
 *  Sets the wsl version of an already installed version.
 *
 * ```
 * wsl.exe  --set-version <Distro> <Version>
 * ```
 *
 * @param {string} distribution name of the distribution
 * @param {(1|2)} version version to set the distribution to
 * @param {Object} [options ={}] options passed to `execa`
 * @returns {Promise} Promise the result of calling `wsl.exe` with execa
 */

const setVersion = async (distribution, version, options = {}) => {
  ow(distribution, 'distribution', ow.string.not.empty);
  ow(version, 'version', ow.number.oneOf([1, 2]));
  ow(options, 'options', ow.optional.object);

  const commandArgs = ['--set-version', distribution, version.toString()];

  return wsl(commandArgs, options);
};

module.exports = setVersion;
