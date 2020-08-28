import ow from 'ow';
import execa from 'execa';

import { wsl } from '../wsl';
/**
 * Export a distribution into a file
 *
 * @example
 * ```javascript
 * const { exportDistribution } = require('node-wsl')
 *
 * const exported = await exportDistribution('Ubuntu', '/home/user/ubuntu.tar')
 * // 'wsl.exe --export Ubuntu /home/user/ubuntu.tar'
 * ```
 *
 * @param distribution - name of the distribution
 * @param fileName - path/filename. Will be a `.tar`
 * @param options - options passed to `execa`
 * @returns the execa child_process instance / Promise
 */
export const exportDistribution = async (
  distribution: string,
  fileName: string,
  options?: execa.Options,
): Promise<execa.ExecaReturnValue> => {
  ow(distribution, 'distribution', ow.string.not.empty);
  ow(fileName, 'fileName', ow.string.not.empty);
  ow(options, 'options', ow.optional.object);

  return wsl(['--export', distribution, fileName], options);
};
