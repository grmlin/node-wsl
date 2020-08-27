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
 * @param {execa.Options} [options={}] options passed to `execa`
 * @returns {execa.ExecaChildProcess} execa child_process instance
 */
const shutdown = async (options = {}) => {
  ow(options, 'options', ow.optional.object);

  const commandArgs = ['--shutdown'];

  return wsl(commandArgs, options);
};

module.exports = shutdown;
