import { DistributionStatus } from './statusParser';

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
}

/**
 * Creates the full status object of the wsl installation
 *
 * @param distributions - list of distribution status parsed from `wsl.exe --list --verbose`
 * @returns the wsl status
 */
export const createStatus = (distributions: DistributionStatus[]): null | WslStatus => {
  if (!Array.isArray(distributions)) {
    return null;
  }

  const runningDistributions = distributions.filter((dist) => dist.running);
  const stoppedDistributions = distributions.filter((dist) => dist.stopped);
  const defaultDistribution = distributions.find((dist) => dist.default);
  return {
    distributions,
    runningDistributions,
    stoppedDistributions,
    defaultDistribution,
    total: distributions.length,
    running: runningDistributions.length,
    stopped: stoppedDistributions.length,
  };
};
