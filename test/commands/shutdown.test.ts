import { shutdown } from '../../source/commands/shutdown';

describe('shutdown', () => {
  test('shuts down all distributions and the vm', async () => {
    const response = await shutdown();
    expect(response.stdout).toBe('wsl.exe --shutdown');
  });
});
