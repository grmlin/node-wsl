/* global describe, beforeEach, test, expect */

'use strict';

const execa = require('execa');
const setVersion = require('../../lib/commands/setVersion');

describe('setVersion', () => {
  beforeEach(() => {
    execa.mockClear();
  });

  test('sets a version of a distribution', async () => {
    const response = await setVersion('Debian', 1);
    expect(response.stdout).toBe('wsl.exe --set-version Debian 1');
  });
});
