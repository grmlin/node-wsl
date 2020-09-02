import execa from 'execa';
import ow from 'ow';
import { wsl } from '../wsl';

/**
 *
 * Shuts down all running distribution and the virtual WSL utility machine immediately.
 *
 * @example
 *  ```javascript
 *  const { shutdown } = require('node-wsl')
 *
 *  await shutdown() // turn it off already
 *  ```
 *
 * @param options - options passed to `execa`
 * @returns the execa child_process instance / Promise
 */
export const shutdown = async (options?: execa.Options): Promise<execa.ExecaReturnValue> => {
  ow(options, 'options', ow.optional.object);

  const commandArgs = ['--shutdown'];

  return wsl(commandArgs, options);
};
