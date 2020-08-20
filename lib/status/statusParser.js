'use strict';

const eol = require('eol');
const { isString, isObject } = require('lodash');

const INDEX_DEFAULT = 0;
const INDEX_NAME = 1;
const INDEX_STATE = 2;
const INDEX_VERSION = 3;

const STATE_RUNNING = 'Running';
const STATE_STOPPED = 'Stopped';

/**
 * @typedef distributionStatus
 * @type {Object}
 * @property {string} name the distribution name
 * @property {string} state current state of the distribution (Running, Stopped)
 * @property {string} version the distributions wsl version
 * @property {boolean} isDefault true if it's the default distribution
 * @property {boolean} isRunning true if the distribution is currently running
 * @property {boolean} isStopped true if the distribution is currently stopped
 */

/**
 * Parses the status of all wsl distributions currently installed
 *
 * @param {string} listResponse the response of `wsl.exe --list --verbose --all
 * @returns {distributionStatus}
 */
const parseStatus = (listResponse) => {
  // first, get rid of the null bytes
  // eslint-disable-next-line no-control-regex
  const cleaned = listResponse.replace(/\u0000/g, '');
  // then split the lines and remove empty ones
  const lines = eol.split(cleaned).filter((line) => line);

  /**
   * process each line. The first line will be removed as it's the table
   * header created by `wsl.exe --list --verbose`
   */
  const wslStatus = lines
    .slice(1)
    .map((line) => {
      const columns = line.split(/[ ]+/);
      const isDefault = columns[INDEX_DEFAULT].length > 0;
      const name = columns[INDEX_NAME];
      const state = columns[INDEX_STATE];
      const isRunning = state === STATE_RUNNING;
      const isStopped = state === STATE_STOPPED;
      const version = columns[INDEX_VERSION];
      const distributionStatus =
        isString(name) && name !== ''
          ? {
              name,
              state,
              version,
              isDefault,
              isRunning,
              isStopped
            }
          : null;
      return distributionStatus;
    })
    .filter((status) => isObject(status));

  return wslStatus;
};

exports.parseStatus = parseStatus;
