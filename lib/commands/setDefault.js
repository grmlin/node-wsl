'use strict';

const ow = require('ow');
const { isString, isBoolean } = require('lodash');
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
 * @returns {Promise} Promise the result of calling `wsl.exe` with execa
 */

const list = async (distribution, options = {}) => {
  ow(distribution, 'distribution', ow.string.not.empty);
  ow(options, 'options', ow.optional.object);

  const commandArgs = ['--set-default', distribution];

  return wsl(commandArgs, options);
};

module.exports = list;
