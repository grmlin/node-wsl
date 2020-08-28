/**
 * Execute commands using `wsl.exe`.
 * Wrapper for the `wsl.exe` cli of the windows subsystem for linux
 * uses execa for process execution.
 *
 * @see https://github.com/sindresorhus/execa
 */
import ow from 'ow';
import isString from 'lodash/isString';
import isBoolean from 'lodash/isBoolean';
import execa from 'execa';
import commandExists from 'command-exists';

let wslExists: boolean;

/**
 * Creates and executes a wsl call using `execa`
 *
 * @example
 * ```
 * const { wsl } = require('node-wsl');
 *
 * const response = await wsl(['--list', '--verbose']) // calls wsl.exe --list --verbose
 * ```
 *
 * @param args - arguments passed to `wsl.exe`. An array of strings used with `spawnSync`. Undefined and empty strings will be removed
 * @param options - options passed to `execa`
 * @returns the execa child_process instance / Promise
 */
export const wsl = async (args: string[], options: execa.Options = {}): Promise<execa.ExecaReturnValue> => {
  ow(args, 'arguments', ow.array);
  if (!isBoolean(wslExists)) {
    try {
      const command = await commandExists('wsl.exe');
      wslExists = isString(command);
    } catch (e) {
      wslExists = false;
    }
  }

  if (!wslExists) {
    throw new ReferenceError('node-wsl: wsl.exe not found');
  }

  const wslArguments = args.filter((arg) => isString(arg) && arg !== '');
  const result = await execa('wsl.exe', wslArguments, options);
  return result;
};
