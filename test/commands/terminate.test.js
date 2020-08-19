/* global describe, beforeEach, test, expect */

'use strict';

const execa = require('execa');
const terminate = require('../../lib/commands/terminate');

describe('terminate', () => {
  beforeEach(() => {
    execa.mockClear();
  });

  test('terminates a distribution', async () => {
    const response = await terminate('Debian');
    expect(response.stdout).toBe('wsl.exe --terminate Debian');
  });
});
