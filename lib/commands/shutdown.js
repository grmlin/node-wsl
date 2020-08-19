'use strict';

const ow = require('ow');
const wsl = require('../wsl');

/**
 *
 * Shuts down all running distribution and the virtual WSL utility machine immediately.
 *
 * ```
 * wsl.exe  --shutdown
 * ```
 *
 * @param {Object} [options ={}] options passed to `execa`
 * @returns {Promise} Promise the result of calling `wsl.exe` with execa
 */

const shutdown = async (options = {}) => {
  ow(options, 'options', ow.optional.object);

  const commandArgs = ['--shutdown'];

  return wsl(commandArgs, options);
};

module.exports = shutdown;
