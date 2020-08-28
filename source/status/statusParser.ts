import eol from 'eol';
import isString from 'lodash/isString';
import isObject from 'lodash/isObject';

enum Columns {
  DEFAULT = 0,
  NAME = 1,
  STATE = 2,
  VERSION = 3,
}
enum DistibutionState {
  RUNNING = 'Running',
  STOPPED = 'Stopped',
}

/**
 * Status of a distribution
 */
export interface DistributionStatus {
  /**
   * The distribution name
   */
  name: string;
  /**
   * Current state of the distribution (Running, Stopped)
   */
  state: string;
  /**
   * The distributions wsl version
   */
  version: string;
  /**
   * True if it's the default distribution
   */
  default: boolean;
  /**
   * True if the distribution is currently running
   */
  running: boolean;
  /**
   * True if the distribution is currently stopped
   */
  stopped: boolean;
}

/**
 * Parses the status of all wsl distributions currently installed
 *
 * @param listResponse - the response of `wsl.exe --list --verbose --all
 * @returns the list of installed distributions
 */
export const parse = (listResponse: string): DistributionStatus[] => {
  // First, get rid of the null bytes
  // eslint-disable-next-line no-control-regex
  const cleaned = listResponse.replace(/\u0000/g, '');
  // Then split the lines and remove empty ones
  const lines = eol.split(cleaned).filter((line) => line);

  return lines
    .slice(1)
    .map((line) => {
      const columns = line.split(/ +/);
      const defaultDist = columns[Columns.DEFAULT].length > 0;
      const name = columns[Columns.NAME];
      const state = columns[Columns.STATE];
      const running = state === DistibutionState.RUNNING;
      const stopped = state === DistibutionState.STOPPED;
      const version = columns[Columns.VERSION];
      return {
        name,
        state,
        version,
        default: defaultDist,
        running,
        stopped,
      };
    })
    .filter((status) => isObject(status) && isString(status.name) && status.name !== '');
};
