'use strict';

const ow = require('ow');
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
 * @param {execa.Options} [options={}] options passed to `execa`
 * @returns {execa.ExecaChildProcess} execa child_process instance
 */
const setVersion = async (distribution, version, options = {}) => {
  ow(distribution, 'distribution', ow.string.not.empty);
  ow(version, 'version', ow.number.oneOf([1, 2]));
  ow(options, 'options', ow.optional.object);

  const commandArgs = ['--set-version', distribution, version.toString()];

  return wsl(commandArgs, options);
};

module.exports = setVersion;
