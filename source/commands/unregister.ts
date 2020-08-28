import ow from 'ow';
import execa from 'execa';
import { wsl } from '../wsl';

/**
 *
 * Unregister the selected distribution
 *
 * @example
 * ```javascript
 * const { unregister } = require('node-wsl')
 *
 * await unregister('Debian') // unregister Debian
 * ```
 *
 * @param distribution - name of the distribution
 * @param options - options passed to `execa`
 * @returns the execa child_process instance / Promise
 */
export const unregister = async (distribution: string, options?: execa.Options): Promise<execa.ExecaReturnValue> => {
  ow(distribution, 'distribution', ow.string.not.empty);
  ow(options, 'options', ow.optional.object);

  const commandArgs = ['--unregister', distribution];

  return wsl(commandArgs, options);
};
