/* global describe, beforeEach, test, expect */
'use strict';
const { run, executeCommand, exportDistribution } = require('../lib/wsl');
const execa = require('execa');

describe('wsl', () => {
  beforeEach(() => {
    execa.mockClear();
  });

  test('executeCommand', async () => {
    const uptime = await executeCommand(['uptime']);
    await expect(uptime).toBe('wsl.exe uptime');
    await expect(() => executeCommand()).rejects.toMatchInlineSnapshot(
      `[ArgumentError: Expected \`arguments\` to be of type \`array\` but received type \`undefined\`]`
    );
    await expect(() => executeCommand(['unknown'])).rejects.toEqual(
      new Error('execa failed')
    );
  });
  test('run', async () => {
    const uptime = await run('uptime');
    const uptimeDebian = await run('uptime', { distribution: 'Debian' });
    const uptimeDebianUser = await run('uptime', {
      distribution: 'Debian',
      user: 'root'
    });
    expect(uptime).toBe('wsl.exe uptime');
    expect(uptimeDebian).toBe('wsl.exe --distribution Debian uptime');
    expect(uptimeDebianUser).toBe(
      'wsl.exe --distribution Debian --user root uptime'
    );
    expect(execa.mock.calls.length).toBe(3);
    expect(execa.mock.calls[0].length).toBe(2);
    expect(execa.mock.calls[0][0]).toBe('wsl.exe');
    expect(execa.mock.calls[0][1]).toEqual(['uptime']);
    expect(execa.mock.calls[1].length).toBe(2);
    expect(execa.mock.calls[1][0]).toBe('wsl.exe');
    expect(execa.mock.calls[1][1]).toEqual([
      '--distribution',
      'Debian',
      'uptime'
    ]);
    expect(execa.mock.calls[2].length).toBe(2);
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

    await expect(() => run(123)).rejects.toMatchInlineSnapshot(
      `[ArgumentError: Expected \`command\` to be of type \`string\` but received type \`number\`]`
    );

    await expect(() =>
      run('uptime', {
        distribution: 1
      })
    ).rejects.toMatchInlineSnapshot(
      `[ArgumentError: Expected \`distribution\` to be of type \`string\` but received type \`number\`]`
    );

    await expect(() =>
      run('uptime', {
        user: 1
      })
    ).rejects.toMatchInlineSnapshot(
      `[ArgumentError: Expected \`user\` to be of type \`string\` but received type \`number\`]`
    );
  });

  test('export', async () => {
    const exported = await exportDistribution('Debian', 'path/to/my/file.tar');
    expect(exported).toBe('wsl.exe --export Debian path/to/my/file.tar');
    await expect(() => exportDistribution(1, 2)).rejects.toMatchInlineSnapshot(
      `[ArgumentError: Expected \`distribution\` to be of type \`string\` but received type \`number\`]`
    );
    await expect(() =>
      exportDistribution('Debian', 2)
    ).rejects.toMatchInlineSnapshot(
      `[ArgumentError: Expected \`fileName\` to be of type \`string\` but received type \`number\`]`
    );
  });
});
