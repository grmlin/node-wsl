import * as execa from "execa";

/**
 * creates and executes a wsl call using `execa`
 *
 * @async
 *
 * @example
 * const { wsl } = require('node-wsl');
 *
 * const response = await wsl(['--list', '--verbose']) // calls wsl.exe --list --verbose
 *
 * @param {string[]} args arguments passed to `wsl.exe`. An array of strings used with `spawnSync`. Undefined and empty strings will be removed
 * @param {execa.Options} [options={}] options passed to `execa`
 * @returns {execa.ExecaChildProcess} execa child_process instance
 */
export function wsl(
  args: string[],
  options?: execa.Options
): execa.ExecaChildProcess;

interface RunArguments {
  /**
   * Run the specified distribution. If missing the default distribution will be used
   */
  distribution?: string;
  /**
   * Run as the specified user.
   */
  user?: string;
}

/**
 * Run a command inside a distro with `wsl.exe`
 *
 * ```
 * wsl.exe [arguments] <CommandLine>
 * ```
 *
 * @async
 * @param {String} command The command to execute inside the targeted wsl distribution
 * @param {Object} [args={}] optional arguments object
 * @param {String} [args.distribution]  Run the specified distribution. If missing the default distribution will be used
 * @param {String} [args.user] Run as the specified user.
 * @param {execa.Options} [options={}] options passed to `execa`
 * @returns {execa.ExecaChildProcess} execa child_process instance
 */
export function run(
  command: string,
  args?: RunArguments,
  options?: execa.Options
): execa.ExecaChildProcess;

/**
 * Export a distribution into a file
 *
 * `wsl.exe --export <distribution> <fileName>`
 *
 * @async
 * @param {string} distribution name of the distribution
 * @param {string} fileName path/filename. Will be a `.tar`
 * @param {execa.Options} [options={}] options passed to `execa`
 * @returns {execa.ExecaChildProcess} execa child_process instance
 *
 */
export function exportDistribution(
  distribution: string,
  fileName: string,
  options?: execa.Options
): execa.ExecaChildProcess;

interface ImportArguments {
  /**
   * version of the new distribution
   */
  version?: 1 | 2;
}

/**
 * Imports the specified tar file as a new distribution.
 *
 * `wsl.exe --import  <Distro> <InstallLocation> <FileName>
 *
 * @async
 * @param {string} distribution name of the distribution
 * @param {string} installLocation location to install the distribution to
 * @param {string} fileName path to the exported distribution `.tar`. The filename can be - for standard input.
 * @param {Object} [args={}] optional arguments object
 * @param {(1|2)} [args.version]   version of the new distribution
 * @param {execa.Options} [options={}] options passed to `execa`
 * @returns {execa.ExecaChildProcess} execa child_process instance
 *
 */
export function importDistribution(
  distribution: string,
  installLocation: string,
  fileName: string,
  args?: ImportArguments,
  options?: execa.Options
): execa.ExecaChildProcess;

interface ListArguments {
  /**
   * List all distributions
   */
  all?: boolean;
  /**
   * List only distributions that are currently running.
   */
  running?: boolean;
  /**
   * shows distribution names only
   */
  quiet?: boolean;
  /**
   * shows detailed distribution information
   */
  verbose?: boolean;
}

/**
 *
 *  Lists distributions.
 *
 * ```
 * wsl.exe --list [options]
 * ```
 *
 *  Options:
 *      --all
 *         List all distributions, including distributions that are currently being installed or uninstalled.
 *      --running
 *         List only distributions that are currently running.
 *      --quiet, -q
 *          shows distribution names only
 *      --verbose, -v
 *          shows detailed distribution informations
 *
 * @param {Object} [args={}] optional arguments object
 * @param {boolean} [args.all]   List all distributions
 * @param {boolean} [args.running]  List only distributions that are currently running.
 * @param {boolean} [args.quiet]  shows distribution names only
 * @param {boolean} [args.verbose]  shows detailed distribution information
 * @param {execa.Options} [options={}] options passed to `execa`
 * @returns {execa.ExecaChildProcess} execa child_process instance
 */
export function list(
  args?: ListArguments,
  options?: execa.Options
): execa.ExecaChildProcess;

/**
 *
 *  Sets the distribution as the default.
 *
 * ```
 * wsl.exe --set-default <Distro>
 * ```
 *
 * @param {string} distribution name of the distribution
 * @param {execa.Options} [options={}] options passed to `execa`
 * @returns {execa.ExecaChildProcess} execa child_process instance
 */
export function setDefault(
  distribution: string,
  options?: execa.Options
): execa.ExecaChildProcess;

/**
 *
 *  Sets the distribution as the default.
 *
 * ```
 * wsl.exe  --set-default-version <Version>
 * ```
 *
 * @param {(1|2)} version version to set the distribution to
 * @param {execa.Options} [options={}] options passed to `execa`
 * @returns {execa.ExecaChildProcess} execa child_process instance
 */
export function setDefaultVersion(
  version: 1 | 2,
  options?: execa.Options
): execa.ExecaChildProcess;

/**
 *
 *  Sets the wsl version of an already installed version.
 *
 * ```
 * wsl.exe  --set-version <Distro> <Version>
 * ```
 *
 * @param {string} distribution name of the distribution
 * @param {(1|2)} version version to set the distribution to
 * @param {execa.Options} [options={}] options passed to `execa`
 * @returns {execa.ExecaChildProcess} execa child_process instance
 */
export function setVersion(
  distribution: string,
  version: 1 | 2,
  options?: execa.Options
): execa.ExecaChildProcess;

/**
 *
 * Shuts down all running distribution and the virtual WSL utility machine immediately.
 *
 * ```
 * wsl.exe  --shutdown
 * ```
 *
 * @param {execa.Options} [options={}] options passed to `execa`
 * @returns {execa.ExecaChildProcess} execa child_process instance
 */
export function shutdown(options?: execa.Options): execa.ExecaChildProcess;

/**
 *
 *  Shuts down the selected distribution
 * ```
 * wsl.exe  --terminate <Distribution>
 * ```
 *
 * @param {string} distribution name of the distribution
 * @param {execa.Options} [options={}] options passed to `execa`
 * @returns {execa.ExecaChildProcess} execa child_process instance
 */
export function terminate(
  distribution: string,
  options?: execa.Options
): execa.ExecaChildProcess;

/**
 *
 * Unregister the selected distribution
 * ```
 * wsl.exe  --unregister <Distribution>
 * ```
 *
 * @param {string} distribution name of the distribution
 * @param {execa.Options} [options={}] options passed to `execa`
 * @returns {execa.ExecaChildProcess} execa child_process instance
 */
export function unregister(
  distribution: string,
  options?: execa.Options
): execa.ExecaChildProcess;

/**
 * status of a distribution
 */
export interface WslDistributionStatus {
  /**
   * the distribution name
   */
  name: string;
  /**
   * current state of the distribution (Running, Stopped)
   */
  state: string;
  /**
   * the distributions wsl version
   */
  version: 1 | 2;
  /**
   * true if it's the default distribution
   */
  default: boolean;
  /**
   * true if the distribution is currently running
   */
  running: boolean;
  /**
   * true if the distribution is currently stopped
   */
  stopped: boolean;
}

/**
 * wsl status object
 */
export interface WslStatus {
  /**
   * list of distribution status
   */
  distributions: WslDistributionStatus[];
  /**
   * total number of distributions found
   */
  total: number;
  /**
   * number of running distributions
   */
  running: number;
  /**
   * number of stopped distributions
   */
  stopped: number;
  /**
   * name of the default distribution
   */
  default: string;
}

/**
 * utility function to get the wsl list generated from
 * `wsl.exe --list --verbose --all` as a parsed list of
 * status objects
 *
 * @returns {WslStatus}
 */
export function status(): WslStatus;
