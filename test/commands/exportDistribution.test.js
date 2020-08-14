/* global describe, beforeEach, test, expect */

'use strict';

const execa = require('execa');
const exportDistribution = require('../../lib/commands/exportDistribution');

describe('exportDistribution', () => {
  beforeEach(() => {
    execa.mockClear();
  });

  test('exports a distribution', async () => {
    const exported = await exportDistribution('Debian', 'path/to/my/file.tar');
    expect(exported.stdout).toBe('wsl.exe --export Debian path/to/my/file.tar');
  });
});
