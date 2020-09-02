import { importDistribution } from '../../source/commands/importDistribution';

describe('importDistribution', () => {
  test('imports a distribution', async () => {
    let imported = await importDistribution('Debian', 'path/to/distribution', 'path/to/my/backup.tar');
    expect(imported.stdout).toBe('wsl.exe --import Debian path/to/distribution path/to/my/backup.tar');
    imported = await importDistribution('Debian', 'path/to/distribution', 'path/to/my/backup.tar', { version: 2 });
    expect(imported.stdout).toBe('wsl.exe --import Debian path/to/distribution path/to/my/backup.tar --version 2');
  });
});
