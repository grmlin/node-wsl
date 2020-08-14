/* global describe, beforeEach, test, expect */

'use strict';

const execa = require('execa');
const setDefault = require('../../lib/commands/setDefault');

describe('setDefault', () => {
  beforeEach(() => {
    execa.mockClear();
  });

  test('sets a default distribution', async () => {
    const response = await setDefault('Debian');
    expect(response.stdout).toBe('wsl.exe --set-default Debian');
  });
});
