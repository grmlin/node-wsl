import { terminate } from '../../source/commands/terminate';

describe('terminate', () => {
  test('terminates a distribution', async () => {
    const response = await terminate('Debian');
    expect(response.stdout).toBe('wsl.exe --terminate Debian');
  });
});
