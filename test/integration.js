'use strict';

const { run /* exportDistribution */ } = require('..');

(async function () {
  let response = await run('uptime');
  console.log(response.stdout);
  response = await run('uptime', { distribution: 'Debian', user: 'root' });
  console.log(response.stdout);
})();

// (async function () {
//   const response = await exportDistribution('Ubuntu', '~/ubuntu.tar', {
//      shell: true
//   });
// })();
