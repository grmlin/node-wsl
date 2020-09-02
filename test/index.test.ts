import {
  wsl,
  exportDistribution,
  importDistribution,
  list,
  run,
  setDefault,
  setVersion,
  shutdown,
  terminate,
  unregister,
  status,
} from '../source/index';

import { wsl as wslBase } from '../source/wsl';
import { exportDistribution as exportDistributionBase } from '../source/commands/exportDistribution';
import { importDistribution as importDistributionBase } from '../source/commands/importDistribution';
import { list as listBase } from '../source/commands/list';
import { run as runBase } from '../source/commands/run';
import { setDefault as setDefaultBase } from '../source/commands/setDefault';
import { setVersion as setVersionBase } from '../source/commands/setVersion';
import { shutdown as shutdownBase } from '../source/commands/shutdown';
import { terminate as terminateBase } from '../source/commands/terminate';
import { unregister as unregisterBase } from '../source/commands/unregister';
import { status as statusBase } from '../source/status/status';

describe('node-wsl', () => {
  test('exports commands', () => {
    expect(wsl).toBe(wslBase);
    expect(exportDistribution).toBe(exportDistributionBase);
    expect(importDistribution).toBe(importDistributionBase);
    expect(list).toBe(listBase);
    expect(run).toBe(runBase);
    expect(setDefault).toBe(setDefaultBase);
    expect(setVersion).toBe(setVersionBase);
    expect(shutdown).toBe(shutdownBase);
    expect(terminate).toBe(terminateBase);
    expect(unregister).toBe(unregisterBase);
  });
  test('exports status', () => {
    expect(status).toBe(statusBase);
  });
});
