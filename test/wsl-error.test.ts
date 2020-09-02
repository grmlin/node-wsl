import commandExists from 'command-exists';
import { mocked } from 'ts-jest/utils';
import { wsl } from '../source/wsl';

describe('wsl-error', () => {
  test('fails if wsl.exe is missing', async () => {
    mocked(commandExists).mockImplementationOnce(() => {
      throw new Error('command-exists error');
    });
    await expect(() => wsl(['uptime'])).rejects.toEqual(new ReferenceError('node-wsl: wsl.exe not found'));
  });
});
