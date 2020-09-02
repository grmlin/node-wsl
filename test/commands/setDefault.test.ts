import { setDefault } from '../../source/commands/setDefault';

describe('setDefault', () => {
  test('sets a default distribution', async () => {
    const response = await setDefault('Debian');
    expect(response.stdout).toBe('wsl.exe --set-default Debian');
  });
});
