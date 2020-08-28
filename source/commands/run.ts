import execa from 'execa';
import ow from 'ow';
import isString from 'lodash/isString';
import { wsl } from '../wsl';

/**
 * Run a command inside a distro with `wsl.exe`
 *
 * @example
 * ```javascript
 * const { run } = require('node-wsl')
 *
 * let uptime = await run('uptime')
 * // "wsl.exe uptime"
 * console.log(uptime.stdout)
 * // 10:26:19 up 2 days,  1:43,  0 users,  load average: 1.50, 1.54, 0.77
 *
 * uptime = await run('uptime', { distribution: 'Debian', user: 'root' })
 * //  'wsl.exe --distribution Debian --user root uptime'
 * console.log(uptime.stdout)
 * // 10:26:19 up 2 days,  1:43,  0 users,  load average: 1.50, 1.54, 0.77
 * ```
 *
 *
 * @async
 * @param command - The command to execute inside the targeted wsl distribution
 * @param args - arguments object
 * @param args.distribution - Run the specified distribution. If missing the default distribution will be used
 * @param args.user - Run as the specified user.
 * @param options - options passed to `execa`
 * @returns the execa child_process instance / Promise
 *
 */
export const run = async (
  command: string,
  args: {
    distribution?: string;
    user?: string;
  } = {},
  options?: execa.Options,
): Promise<execa.ExecaReturnValue> => {
  const { distribution, user } = args;
  ow(command, 'command', ow.string.not.empty);
  ow(distribution, 'distribution', ow.optional.string);
  ow(user, 'user', ow.optional.string);
  ow(options, 'options', ow.optional.object);

  const commandArgs = [
    ...(isString(distribution) ? ['--distribution', distribution] : []),
    ...(isString(user) ? ['--user', user] : []),
    ...command.split(' '),
  ];

  return wsl(commandArgs, options);
};
