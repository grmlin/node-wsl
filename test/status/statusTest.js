'use strict';

const { wslStatus } = require('../../index');

(async function () {
  const status = await wslStatus();
  console.log(status);
})();
