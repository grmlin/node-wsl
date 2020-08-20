'use strict';

const list = require('../commands/list');
const { parseStatus } = require('./statusParser');

/**
 * utility function to get the wsl list generated from
 * `wsl.exe --list --verbose --all` as a parsed list of
 * status objects
 *
 * @returns {distributionStatus}
 */
const wslStatus = async () => {
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
    return parseStatus(listResponse);
  } catch (e) {
    console.error(e);
    return [];
  }
};

module.exports = wslStatus;
