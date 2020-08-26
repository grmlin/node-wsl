/* global describe, beforeEach, test, expect */

'use strict';

const execa = require('execa');
const wsl = require('../lib/wsl');

describe('wsl', () => {
  beforeEach(() => {
    execa.mockClear();
  });

  test('creates commands to run with wsl.exe', async () => {
    const uptime = await wsl(['uptime']);
    await expect(uptime.stdout).toBe('wsl.exe uptime');
    const uname = await wsl(['uname', '-a']);
    await expect(uname.stdout).toBe('wsl.exe uname -a');
    await expect(() => wsl()).rejects.toMatchInlineSnapshot(
      `[ArgumentError: Expected \`arguments\` to be of type \`array\` but received type \`undefined\`]`
    );
    await expect(() => wsl(['unknown'])).rejects.toEqual(
      new Error('execa failed')
    );
  });
});
