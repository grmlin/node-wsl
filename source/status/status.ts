import { list } from '../commands/list';
import { parse } from './statusParser';
import { WslStatus, createStatus } from './statusFactory';

/**
 * utility function to get the wsl list generated from
 * `wsl.exe --list --verbose --all` as a parsed list of
 * status objects
 *
 * @example
 * ```javascript
 *  const assert = require('assert').strict
 *  const { status } = require('node-wsl')
 *
 *  const status = await status()
 *  const rawList = await list({
 *   all: true,
 *   verbose: true
 * })
 *  // 'wsl.exe --list --verbose --all'
 *
 *  console.log(rawList.stdout)
 *  //
 *  //    NAME                   STATE           VERSION
 *  //  * Debian                 Running         2
 *  //    kali-linux             Stopped         2
 *  //    Ubuntu                 Stopped         2
 *  //
 * assert.deepEqual(status, {
 *   distributions: [
 *       {
 *           default: true,
 *           running: true,
 *           stopped: false,
 *           name: 'Ubuntu',
 *           state: 'Running',
 *           version: '2',
 *       },
 *       {
 *           default: false,
 *           running: false,
 *           stopped: true,
 *           name: 'kali-linux',
 *           state: 'Stopped',
 *           version: '2',
 *       },
 *       {
 *           default: false,
 *           running: true,
 *           stopped: false,
 *           name: 'Debian',
 *           state: 'Running',
 *           version: '2',
 *       },
 *   ],
 *   runningDistributions: [
 *       {
 *           default: true,
 *           running: true,
 *           stopped: false,
 *           name: 'Ubuntu',
 *           state: 'Running',
 *           version: '2',
 *       },
 *       {
 *           default: false,
 *           running: true,
 *           stopped: false,
 *           name: 'Debian',
 *           state: 'Running',
 *           version: '2',
 *       },
 *   ],
 *   stoppedDistributions: [
 *       {
 *           default: false,
 *           running: false,
 *           stopped: true,
 *           name: 'kali-linux',
 *           state: 'Stopped',
 *           version: '2',
 *       },
 *   ],
 *   defaultDistribution: {
 *       default: true,
 *       running: true,
 *       stopped: false,
 *       name: 'Ubuntu',
 *       state: 'Running',
 *       version: '2',
 *   },
 *   total: 3,
 *   running: 2,
 *   stopped: 1,
 * })
 * ```
 *
 * @returns the wsl status
 */
export const status = async (): Promise<WslStatus | null> => {
  try {
    const response = await list(
      {
        all: true,
        verbose: true,
      },
      {
        all: true,
        // Encoding: 'UTF-8',
        // stdio: 'pipe'
      },
    );
    // TODO error/stderr handling
    const listResponse = response.stdout.toString();
    const result = parse(listResponse);
    return createStatus(result);
  } catch (error) {
    console.error(error);
    return null;
  }
};
