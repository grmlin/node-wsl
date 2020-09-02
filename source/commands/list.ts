import execa from 'execa';
import ow from 'ow';
import isBoolean from 'lodash/isBoolean';
import { wsl } from '../wsl';

/**
 *
 *  Lists distributions.
 *
 * @example
 *
 * ```javascript
 *  const { list } = require('node-wsl')*
 *
 *  const response = await list({
 *   all: true,
 *   verbose: true
 *  })
 *  // 'wsl.exe --list --verbose --all'*
 *
 *  console.log(response.stdout);
 *  //    NAME                   STATE           VERSION
 *  //  * Debian                 Running         2
 *  //    kali-linux             Stopped         2
 *  //    Ubuntu                 Stopped         2
 * ```
 *
 * @param args - arguments object
 * @param args.all - List all distributions
 * @param args.running - List only distributions that are currently running.
 * @param args.quiet - shows distribution names only
 * @param args.verbose - shows detailed distribution information
 * @param options - options passed to `execa`
 * @returns the execa child_process instance / Promise
 */
export const list = async (
  args: {
    all?: boolean;
    running?: boolean;
    quiet?: boolean;
    verbose?: boolean;
  } = {},
  options?: execa.Options,
): Promise<execa.ExecaReturnValue> => {
  const { all, running, quiet, verbose } = args;
  ow(args, 'args', ow.optional.object);
  ow(all, 'all', ow.optional.boolean);
  ow(running, 'running', ow.optional.boolean);
  ow(quiet, 'quiet', ow.optional.boolean);
  ow(verbose, 'verbose', ow.optional.boolean);
  ow(options, 'options', ow.optional.object);

  if (isBoolean(running) && running && isBoolean(all) && all) {
    throw new TypeError("list: you can't list both all distributions and only the ones that are running");
  }

  if (isBoolean(quiet) && quiet && isBoolean(verbose) && verbose) {
    throw new TypeError("list: you can't combine quiet with verbose");
  }

  const commandArgs = [
    '--list',
    ...(isBoolean(all) && all ? ['--all'] : []),
    ...(isBoolean(running) && running ? ['--running'] : []),
    ...(isBoolean(quiet) && quiet ? ['--quiet'] : []),
    ...(isBoolean(verbose) && verbose ? ['--verbose'] : []),
  ];

  return wsl(commandArgs, options);
};
