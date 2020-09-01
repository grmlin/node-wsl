/**
 * Status of a distribution
 */
export interface DistributionStatus {
  /**
   * The distribution name
   */
  name: string;
  /**
   * Current state of the distribution (Running, Stopped)
   */
  state: string;
  /**
   * The distributions wsl version
   */
  version: string;
  /**
   * True if it's the default distribution
   */
  default: boolean;
  /**
   * True if the distribution is currently running
   */
  running: boolean;
  /**
   * True if the distribution is currently stopped
   */
  stopped: boolean;
}

/**
 * Wsl status object
 */
export interface WslStatus {
  /**
   * List of distribution status
   */
  distributions: DistributionStatus[];
  /**
   * List of running distributions
   */
  runningDistributions: DistributionStatus[];
  /**
   * list of stopped distributions
   */
  stoppedDistributions: DistributionStatus[];
  /**
   * default distribution
   */
  defaultDistribution?: DistributionStatus;
  /**
   * Total number of distributions found
   */
  total: number;
  /**
   * Number of running distributions
   */
  running: number;
  /**
   * Number of stopped distributions
   */
  stopped: number;
  /**
   * timestamp of the status creation. String returned from `Date.toISOString()`
   */
  createdAt: string;
}

/**
 * current state of a distribution
 */
export enum DistributionState {
  /**
   * Up and running
   */
  RUNNING = 'Running',
  /**
   * stopped
   */
  STOPPED = 'Stopped',
}
