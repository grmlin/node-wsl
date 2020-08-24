/* global describe, beforeEach, test, expect */

'use strict';

const commandExists = require('command-exists');
const wsl = require('../lib/wsl');

describe('wsl failure', () => {
  test('fails if wsl.exe is missing', async () => {
    commandExists.mockReturnValue(Promise.resolve(false));
    await expect(() => wsl(['uptime'])).rejects.toEqual(
      new ReferenceError('node-wsl: wsl.exe not found')
    );
  });
});
