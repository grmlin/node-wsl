import execa from 'execa';
import ow from 'ow';
import { wsl } from '../wsl';

/**
 *
 *  Sets the wsl version of an already installed version.
 *
 * @example
 *
 * ```javascript
 * const { setVersion } = require('node-wsl')
 *
 * await setVersion('Debian', 1) // Debian will use WSL 1 from now on
 * ```
 *
 * @param distribution - name of the distribution
 * @param version - version to set the distribution to
 * @param options - options passed to `execa`
 * @returns the execa child_process instance / Promise
 */
export const setVersion = async (
  distribution: string,
  version: 1 | 2,
  options?: execa.Options,
): Promise<execa.ExecaReturnValue> => {
  ow(distribution, 'distribution', ow.string.not.empty);
  ow(version, 'version', ow.number.oneOf([1, 2]));
  ow(options, 'options', ow.optional.object);

  const commandArgs = ['--set-version', distribution, version.toString()];

  return wsl(commandArgs, options);
};
