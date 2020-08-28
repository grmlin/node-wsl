import execa from 'execa';
import ow from 'ow';
import { wsl } from '../wsl';

/**
 *
 *  Sets the distribution as the default.
 *
 *  @example
 *  ```javascript
 *  const { setDefault } = require('node-wsl')
 *
 *  await setDefault('Debian') // Debian should now be the default distribution
 *  ```
 *
 * @param distribution - name of the distribution
 * @param options - options passed to `execa`
 * @returns the execa child_process instance / Promise
 */
export const setDefault = async (distribution: string, options?: execa.Options): Promise<execa.ExecaReturnValue> => {
  ow(distribution, 'distribution', ow.string.not.empty);
  ow(options, 'options', ow.optional.object);

  const commandArgs = ['--set-default', distribution];

  return wsl(commandArgs, options);
};
