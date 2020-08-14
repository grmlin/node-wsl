'use strict';

const ow = require('ow');
const wsl = require('../wsl');
/**
 * Export a distribution into a file
 *
 * `wsl.exe --export <distribution> <fileName>`
 *
 * @async
 * @param {string} distribution name of the distribution
 * @param {string} fileName path/filename. Will be a `.tar`
 * @param {Object} [options ={}] options passed to `execa`
 * @returns {Promise} Promise the result of calling `wsl.exe` with execa
 *
 */
const exportDistribution = async (distribution, fileName, options = {}) => {
  ow(distribution, 'distribution', ow.string.not.empty);
  ow(fileName, 'fileName', ow.string.not.empty);
  ow(options, 'options', ow.optional.object);

  return wsl(['--export', distribution, fileName], options);
};

module.exports = exportDistribution;
