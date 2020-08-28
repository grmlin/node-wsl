import { exportDistribution } from '../../source/commands/exportDistribution';

describe('exportDistribution', () => {
  test('exports a distribution', async () => {
    const exported = await exportDistribution('Debian', 'path/to/my/file.tar');
    expect(exported.stdout).toBe('wsl.exe --export Debian path/to/my/file.tar');
  });
});
