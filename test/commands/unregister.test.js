/* global describe, beforeEach, test, expect */

'use strict';

const execa = require('execa');
const unregister = require('../../lib/commands/unregister');

describe('unregister', () => {
  beforeEach(() => {
    execa.mockClear();
  });

  test('unregisters a distribution', async () => {
    const response = await unregister('Debian');
    expect(response.stdout).toBe('wsl.exe --unregister Debian');
  });
});
