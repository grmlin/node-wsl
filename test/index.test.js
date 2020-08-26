/* global describe, test, expect */
const {
  wsl,
  run,
  exportDistribution,
  importDistribution,
  list,
  setDefault,
  setDefaultVersion,
  setVersion,
  shutdown,
  terminate,
  unregister,
  status
} = require('../index');

const wslBase = require('../lib/wsl');
const runBase = require('../lib/commands/run');
const exportDistributionBase = require('../lib/commands/exportDistribution');
const importDistributionBase = require('../lib/commands/importDistribution');
const listBase = require('../lib/commands/list');
const setDefaultBase = require('../lib/commands/setDefault');
const setDefaultVersionBase = require('../lib/commands/setDefaultVersion');
const setVersionBase = require('../lib/commands/setVersion');
const shutdownBase = require('../lib/commands/shutdown');
const terminateBase = require('../lib/commands/terminate');
const unregisterBase = require('../lib/commands/unregister');
const statusBase = require('../lib/status/status');

describe('node-wsl', () => {
  test('exports commands', () => {
    expect(wsl).toBe(wslBase);
    expect(run).toBe(runBase);
    expect(exportDistribution).toBe(exportDistributionBase);
    expect(importDistribution).toBe(importDistributionBase);
    expect(list).toBe(listBase);
    expect(setDefault).toBe(setDefaultBase);
    expect(setDefaultVersion).toBe(setDefaultVersionBase);
    expect(setVersion).toBe(setVersionBase);
    expect(shutdown).toBe(shutdownBase);
    expect(terminate).toBe(terminateBase);
    expect(unregister).toBe(unregisterBase);
  });
  test('exports status', () => {
    expect(status).toBe(statusBase);
  });
});
