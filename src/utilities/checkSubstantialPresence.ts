import { YearStats } from "./summarizeByYear";

export type SubstantialPresenceResult = {
  year: number;
  currentYearDays: number;
  priorYear1Days: number;
  priorYear2Days: number;
  totalWeightedDays: number;
  meetsSPT: boolean;
  failureReasons: FailureReason[];
};

export type FailureReason =
  | "insufficient_current_year_days"
  | "insufficient_weighted_days";

export function checkSubstantialPresence(
  stats: YearStats,
  year: number
): SubstantialPresenceResult {
  const currentYear = year.toString();
  const priorYear1 = (year - 1).toString();
  const priorYear2 = (year - 2).toString();

  const currentYearDays = stats[currentYear] || 0;
  const priorYear1Days = stats[priorYear1] || 0;
  const priorYear2Days = stats[priorYear2] || 0;

  const totalWeightedDays =
    currentYearDays + priorYear1Days / 3 + priorYear2Days / 6;

  const sufficientCurrentYearDays = currentYearDays >= 31;
  const sufficientWeightedDays = totalWeightedDays >= 183;

  const meetsSPT = sufficientCurrentYearDays && sufficientWeightedDays;

  const failureReasons: FailureReason[] = [];
  if (!sufficientCurrentYearDays)
    failureReasons.push("insufficient_current_year_days");
  if (!sufficientWeightedDays)
    failureReasons.push("insufficient_weighted_days");

  return {
    year,
    currentYearDays,
    priorYear1Days,
    priorYear2Days,
    totalWeightedDays,
    meetsSPT,
    failureReasons,
  };
}
