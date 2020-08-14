/* global describe, beforeEach, test, expect */

'use strict';

const execa = require('execa');
const run = require('../../lib/commands/run');

describe('run', () => {
  beforeEach(() => {
    execa.mockClear();
  });

  test('runs commands in a distribution', async () => {
    const uptime = await run('uptime');
    const uptimeDebian = await run('uptime', { distribution: 'Debian' });
    const uptimeDebianUser = await run('uptime', {
      distribution: 'Debian',
      user: 'root'
    });
    expect(uptime.stdout).toBe('wsl.exe uptime');
    expect(uptimeDebian.stdout).toBe('wsl.exe --distribution Debian uptime');
    expect(uptimeDebianUser.stdout).toBe(
      'wsl.exe --distribution Debian --user root uptime'
    );
    expect(execa.mock.calls.length).toBe(3);
    expect(execa.mock.calls[0].length).toBe(3);
    expect(execa.mock.calls[0][0]).toBe('wsl.exe');
    expect(execa.mock.calls[0][1]).toEqual(['uptime']);
    expect(execa.mock.calls[1].length).toBe(3);
    expect(execa.mock.calls[1][0]).toBe('wsl.exe');
    expect(execa.mock.calls[1][1]).toEqual([
      '--distribution',
      'Debian',
      'uptime'
    ]);
    expect(execa.mock.calls[2].length).toBe(3);
    expect(execa.mock.calls[2][0]).toBe('wsl.exe');
    expect(execa.mock.calls[2][1]).toEqual([
      '--distribution',
      'Debian',
      '--user',
      'root',
      'uptime'
    ]);

    await expect(() => run('unknown')).rejects.toEqual(
      new Error('execa failed')
    );
  });
});
