/* global describe, beforeEach, test, expect */

'use strict';

const execa = require('execa');
const shutdown = require('../../lib/commands/shutdown');

describe('shutdown', () => {
  beforeEach(() => {
    execa.mockClear();
  });

  test('shuts down all distributions and the vm', async () => {
    const response = await shutdown();
    expect(response.stdout).toBe('wsl.exe --shutdown');
  });
});
