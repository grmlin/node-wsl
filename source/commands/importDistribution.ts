import execa from 'execa';
import ow from 'ow';
import isNumber from 'lodash/isNumber';
import { wsl } from '../wsl';

/**
 * Imports the specified tar file as a new distribution.
 *
 * `wsl.exe --import  <Distro> <InstallLocation> <FileName>
 *
 * @async
 * @param distribution - name of the distribution
 * @param installLocation - location to install the distribution to
 * @param fileName - path to the exported distribution `.tar`. The filename can be - for standard input.
 * @param args -  arguments object
 * @param args.version - version of the new distribution
 * @param options - options passed to `execa`
 * @returns the execa child_process instance / Promise
 */
export const importDistribution = async (
  distribution: string,
  installLocation: string,
  fileName: string,
  args: {
    version?: 1 | 2;
  } = {},
  options?: execa.Options,
): Promise<execa.ExecaReturnValue> => {
  const { version } = args;
  ow(distribution, 'distribution', ow.string.not.empty);
  ow(installLocation, 'installLocation', ow.string.not.empty);
  ow(fileName, 'fileName', ow.string.not.empty);
  ow(args, 'args', ow.optional.object);

  if (version !== undefined) {
    ow(version, 'version', ow.optional.number.oneOf([1, 2]));
  }
  ow(options, 'options', ow.optional.object);

  const commandArgs = [
    '--import',
    distribution,
    installLocation,
    fileName,
    ...(isNumber(version) ? ['--version', version.toString()] : []),
  ];

  return wsl(commandArgs, options);
};
