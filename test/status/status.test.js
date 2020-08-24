/* global jest, describe, test, expect */

'use strict';

jest.mock('../../lib/status/statusParser', () => ({
  parse: jest.fn()
}));

// eslint-disable-next-line node/no-unpublished-require
const mockConsole = require('jest-mock-console');
const status = require('../../lib/status/status');
const { parse } = require('../../lib/status/statusParser');

describe('status', () => {
  const data = [
    {
      isDefault: true,
      isRunning: true,
      isStopped: false,
      name: 'Ubuntu',
      state: 'Running',
      version: '2'
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
      name: 'Debian',
      state: 'Running',
      version: '2'
    }
  ];

  test('returns the current status of the wsl as json', async () => {
    parse.mockReturnValueOnce(data);
    const result = await status();
    // have a look at the execa mock if you wonder where these values come from
    expect(result).toEqual([
      {
        isDefault: true,
        isRunning: true,
        isStopped: false,
        name: 'Ubuntu',
        state: 'Running',
        version: '2'
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
        name: 'Debian',
        state: 'Running',
        version: '2'
      }
    ]);
  });

  test('returns an empty array when the parser does not return an array', async () => {
    parse.mockReturnValueOnce(undefined);

    const result = await status();
    expect(result).toEqual([]);
  });

  test('returns an empty array when the parser fails', async () => {
    const restoreConsole = mockConsole();
    parse.mockImplementationOnce(() => {
      throw new Error('error');
    });

    const result = await status();
    expect(result).toEqual([]);
    expect(console.error).toHaveBeenCalled();
    restoreConsole();
  });
});
