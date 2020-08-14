/* global describe, beforeEach, test, expect */

'use strict';

const execa = require('execa');
const importDistribution = require('../../lib/commands/importDistribution');

describe('importDistribution', () => {
  beforeEach(() => {
    execa.mockClear();
  });

  test('imports a distribution', async () => {
    let imported = await importDistribution('Debian', 'path/to/my/backup.tar');
    expect(imported.stdout).toBe(
      'wsl.exe --import Debian path/to/my/backup.tar'
    );
    imported = await importDistribution(
      'Debian',
      'path/to/my/backup.tar',
      'path/to/installation'
    );
    expect(imported.stdout).toBe(
      'wsl.exe --import Debian path/to/installation path/to/my/backup.tar'
    );
  });
});
