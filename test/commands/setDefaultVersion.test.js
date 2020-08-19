/* global describe, beforeEach, test, expect */

'use strict';

const execa = require('execa');
const setDefaultVersion = require('../../lib/commands/setDefaultVersion');

describe('setDefaultVersion', () => {
  beforeEach(() => {
    execa.mockClear();
  });

  test('sets a default version for new distributions', async () => {
    const response = await setDefaultVersion(2);
    expect(response.stdout).toBe('wsl.exe --set-default-version 2');
  });
});
