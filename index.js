'use strict';

const wsl = require('./lib/wsl');
const run = require('./lib/commands/run');
const exportDistribution = require('./lib/commands/exportDistribution');
const importDistribution = require('./lib/commands/importDistribution');
const setDefault = require('./lib/commands/setDefault');
const setDefaultVersion = require('./lib/commands/setDefaultVersion');
const setVersion = require('./lib/commands/setVersion');
const shutdown = require('./lib/commands/shutdown');
const terminate = require('./lib/commands/terminate');
const unregister = require('./lib/commands/unregister');

exports.wsl = wsl;
exports.run = run;
exports.exportDistribution = exportDistribution;
exports.importDistribution = importDistribution;
exports.setDefault = setDefault;
exports.setDefaultVersion = setDefaultVersion;
exports.setVersion = setVersion;
exports.shutdown = shutdown;
exports.terminate = terminate;
exports.unregister = unregister;
