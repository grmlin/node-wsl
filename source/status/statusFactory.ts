import { DistributionStatus, WslStatus } from '../types';

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
  const createdAt = new Date();
  return {
    distributions,
    runningDistributions,
    stoppedDistributions,
    defaultDistribution,
    total: distributions.length,
    running: runningDistributions.length,
    stopped: stoppedDistributions.length,
    createdAt: createdAt.toISOString(),
  };
};
