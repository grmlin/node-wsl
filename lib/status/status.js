'use strict';

const list = require('../commands/list');
const { parse } = require('./statusParser');
/**
 * The wsl status object
 * @typedef {Object} WslStatus
 * @property {WslDistributionStatus[]} distributions list of distributions
 * @property {number} total number of distributions found
 * @property {number} running number of running distributions
 * @property {number} stopped number of stopped distributions
 * @property {string} default name of the default distribution
 */

/**
 * utility function to get the wsl list generated from
 * `wsl.exe --list --verbose --all` as a parsed list of
 * status objects
 *
 * @returns {WslStatus}
 */
const status = async () => {
  try {
    const response = await list(
      {
        all: true,
        verbose: true
      },
      {
        all: true
        // encoding: 'UTF-8',
        // stdio: 'pipe'
      }
    );
    // TODO error/stderr handling
    const listResponse = response.stdout.toString();
    const result = parse(listResponse);
    return Array.isArray(result) ? result : [];
  } catch (e) {
    console.error(e);
    return [];
  }
};

module.exports = status;
