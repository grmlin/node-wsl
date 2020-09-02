import { unregister } from '../../source/commands/unregister';

describe('unregister', () => {
  test('unregisters a distribution', async () => {
    const response = await unregister('Debian');
    expect(response.stdout).toBe('wsl.exe --unregister Debian');
  });
});
