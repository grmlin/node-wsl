import { setVersion } from '../../source/commands/setVersion';

describe('setVersion', () => {
  test('sets a version of a distribution', async () => {
    const response = await setVersion('Debian', 1);
    expect(response.stdout).toBe('wsl.exe --set-version Debian 1');
  });
});
