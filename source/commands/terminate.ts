import ow from 'ow';
import { wsl } from '../wsl';
import execa from 'execa';

/**
 *
 *  Shuts down the selected distribution
 *
 * @example
 * ```javascript
 * const { terminate } = require('node-wsl')
 *
 * await terminate('Debian') // turn off Debian
 * ```
 *
 * @param distribution - name of the distribution
 * @param options - options passed to `execa`
 * @returns the execa child_process instance / Promise
 */
export const terminate = async (distribution: string, options?: execa.Options): Promise<execa.ExecaReturnValue> => {
  ow(distribution, 'distribution', ow.string.not.empty);
  ow(options, 'options', ow.optional.object);

  const commandArgs = ['--terminate', distribution];

  return wsl(commandArgs, options);
};
