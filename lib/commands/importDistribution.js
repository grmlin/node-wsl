'use strict';
'use strict';

const ow = require('ow');
const { isString } = require('lodash');
const wsl = require('../wsl');

/**
 * Imports the specified tar file as a new distribution.
 *
 * `wsl.exe --import  <Distro> <InstallLocation> <FileName>
 *
 * @async
 * @param {string} distribution name of the distribution
 * @param {string} fileName path/filename. Will be a `.tar`
 * @param {string} installLocation path/filename. Will be a `.tar`
 * @param {Object} [options ={}] options passed to `execa`
 * @returns {Promise} Promise the result of calling `wsl.exe` with execa
 *
 */
const importDistribution = async (
  distribution,
  fileName,
  installLocation,
  options = {}
) => {
  ow(distribution, 'distribution', ow.string.not.empty);
  ow(fileName, 'fileName', ow.string.not.empty);
  ow(fileName, 'installLocation', ow.optional.string.not.empty);
  ow(options, 'options', ow.optional.object);

  if (isString(installLocation)) {
    return wsl(['--import', distribution, installLocation, fileName], options);
  }
  return wsl(['--import', distribution, fileName], options);
};

module.exports = importDistribution;
