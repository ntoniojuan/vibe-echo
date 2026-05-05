export const readEchoDashboardCycleProgressProps = (
  receivedCount: number,
  sentCount: number,
) => {
  /** Placeholder targets until product configures cycle OKRs (`openspec/changes/echo-dashboard-sage-ui`). */
  const receivedGoal = 5;
  const sentGoal = 1;
  return {
    receivedCount,
    receivedGoal,
    sentCount,
    sentGoal,
  };
};
