import execa from 'execa';
import { mocked } from 'ts-jest/utils';
import { wsl } from '../source/wsl';

describe('wsl', () => {
  test('creates commands to run with wsl.exe', async () => {
    const uptime = await wsl(['uptime']);
    await expect(uptime.stdout).toBe('wsl.exe uptime');
    const uname = await wsl(['uname', '-a']);
    await expect(uname.stdout).toBe('wsl.exe uname -a');
  });
  test('throws if execa fails to run the command', async () => {
    mocked(execa).mockRejectedValueOnce(new Error('execa error'));
    await expect(() => wsl(['unknown'])).rejects.toEqual(new Error('execa error'));
  });
});
