/* global describe, beforeEach, test, expect */

'use strict';

const execa = require('execa');
const importDistribution = require('../../lib/commands/importDistribution');

describe('importDistribution', () => {
  beforeEach(() => {
    execa.mockClear();
  });

  test('imports a distribution', async () => {
    let imported = await importDistribution(
      'Debian',
      'path/to/distribution',
      'path/to/my/backup.tar'
    );
    expect(imported.stdout).toBe(
      'wsl.exe --import Debian path/to/distribution path/to/my/backup.tar'
    );
    imported = await importDistribution(
      'Debian',
      'path/to/distribution',
      'path/to/my/backup.tar',
      { version: 2 }
    );
    expect(imported.stdout).toBe(
      'wsl.exe --import Debian path/to/distribution path/to/my/backup.tar --version 2'
    );
  });
});
