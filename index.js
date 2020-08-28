const wsl = require('./lib.old/wsl');
const run = require('./lib.old/commands/run');
const exportDistribution = require('./lib.old/commands/exportDistribution');
const importDistribution = require('./lib.old/commands/importDistribution');
const list = require('./lib.old/commands/list');
const setDefault = require('./lib.old/commands/setDefault');
const setDefaultVersion = require('./lib.old/commands/setDefaultVersion');
const setVersion = require('./lib.old/commands/setVersion');
const shutdown = require('./lib.old/commands/shutdown');
const terminate = require('./lib.old/commands/terminate');
const unregister = require('./lib.old/commands/unregister');
const status = require('./lib.old/status/status');

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
