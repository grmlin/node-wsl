/* global describe, test, expect */

'use strict';

const wslStatus = require('../../lib/status/wslStatus');

describe('wslStatus', () => {
  test('returns the current status of the wsl as json', async () => {
    const status = await wslStatus();
    // have a look at the execa mock if you wonder where these values come from
    expect(status).toEqual([
      {
        isDefault: false,
        isRunning: false,
        isStopped: false,
        name: '*',
        state: 'Debian-DEV',
        version: 'Running'
      },
      {
        isDefault: false,
        isRunning: false,
        isStopped: true,
        name: 'kali-linux',
        state: 'Stopped',
        version: '2'
      },
      {
        isDefault: false,
        isRunning: true,
        isStopped: false,
        name: 'docker-desktop-data',
        state: 'Running',
        version: '2'
      },
      {
        isDefault: false,
        isRunning: true,
        isStopped: false,
        name: 'docker-desktop',
        state: 'Running',
        version: '2'
      },
      {
        isDefault: false,
        isRunning: false,
        isStopped: true,
        name: 'Ubuntu',
        state: 'Stopped',
        version: '2'
      },
      {
        isDefault: false,
        isRunning: true,
        isStopped: false,
        name: 'Debian',
        state: 'Running',
        version: '2'
      }
    ]);
  });
});
