'use strict';

const wsl = require('./lib/wsl');
const run = require('./lib/commands/run');
const exportDistribution = require('./lib/commands/exportDistribution');
const importDistribution = require('./lib/commands/importDistribution');
const list = require('./lib/commands/list');
const setDefault = require('./lib/commands/setDefault');
const setDefaultVersion = require('./lib/commands/setDefaultVersion');
const setVersion = require('./lib/commands/setVersion');
const shutdown = require('./lib/commands/shutdown');
const terminate = require('./lib/commands/terminate');
const unregister = require('./lib/commands/unregister');
const status = require('./lib/status/status');

exports.wsl = wsl;
exports.run = run;
exports.exportDistribution = exportDistribution;
exports.importDistribution = importDistribution;
exports.list = list;
exports.setDefault = setDefault;
exports.setDefaultVersion = setDefaultVersion;
exports.setVersion = setVersion;
exports.shutdown = shutdown;
exports.terminate = terminate;
exports.unregister = unregister;

exports.status = status;
