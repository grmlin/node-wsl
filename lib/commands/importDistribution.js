'use strict';

const ow = require('ow');
const { isNumber } = require('lodash');
const wsl = require('../wsl');

/**
 * Imports the specified tar file as a new distribution.
 *
 * `wsl.exe --import  <Distro> <InstallLocation> <FileName>
 *
 * @async
 * @param {string} distribution name of the distribution
 * @param {string} installLocation location to install the distribution to
 * @param {string} fileName path to the exported distribution `.tar`. The filename can be - for standard input.
 * @param {Object} [args={}] optional argumants object
 * @param {(1|2)} [args.version]   version of the new distribution
 * @param {execa.Options} [options={}] options passed to `execa`
 * @returns {execa.ExecaChildProcess} execa child_process instance
 *
 */
const importDistribution = async (
  distribution,
  installLocation,
  fileName,
  args = {},
  options = {}
) => {
  const { version } = args;
  ow(distribution, 'distribution', ow.string.not.empty);
  ow(installLocation, 'installLocation', ow.string.not.empty);
  ow(fileName, 'fileName', ow.string.not.empty);
  ow(args, 'args', ow.optional.object);
  ow(version, 'version', ow.optional.number.oneOf([1, 2]));
  ow(options, 'options', ow.optional.object);

  const commandArgs = [
    '--import',
    distribution,
    installLocation,
    fileName,
    ...(isNumber(version) ? ['--version', version.toString()] : [])
  ];

  return wsl(commandArgs, options);
};

module.exports = importDistribution;
