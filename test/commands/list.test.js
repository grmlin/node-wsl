/* global describe, beforeEach, test, expect */

'use strict';

const execa = require('execa');
const { ArgumentError } = require('ow/dist/source');
const list = require('../../lib/commands/list');

describe('list', () => {
  beforeEach(() => {
    execa.mockClear();
  });

  test('lists distributions', async () => {
    let listed = await list();
    expect(listed.stdout).toBe('wsl.exe --list');

    listed = await list({
      all: true
    });
    expect(listed.stdout).toBe('wsl.exe --list --all');
    listed = await list({
      running: true
    });
    expect(listed.stdout).toBe('wsl.exe --list --running');
    listed = await list({
      quiet: true
    });
    expect(listed.stdout).toBe('wsl.exe --list --quiet');
    listed = await list({
      verbose: true
    });
    expect(listed.stdout).toBe('wsl.exe --list --verbose');
    listed = await list({
      all: true,
      verbose: true
    });
    expect(listed.stdout).toMatchInlineSnapshot(`
      "  NAME                   STATE           VERSION
            * Debian-DEV             Running         2
              kali-linux             Stopped         2
              docker-desktop-data    Running         2
              docker-desktop         Running         2
              Ubuntu                 Stopped         2
              Debian                 Running         2
            "
    `);
  });

  test('throws for impossible argument combinations', async () => {
    await expect(() =>
      list({
        all: true,
        running: true
      })
    ).rejects.toThrow(ArgumentError);
    await expect(() =>
      list({
        quiet: true,
        verbose: true
      })
    ).rejects.toThrow(ArgumentError);
  });
});
