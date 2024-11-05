export function hasTimeElapsed(startDate, value, unit) {
  // Convert the startDate to a Date object if it's not already
  const start = new Date(startDate);
  const now = new Date();

  // Calculate the target date by adding the specified timeframe to the start date
  let targetDate;
  switch (unit) {
      case 'days':
          targetDate = new Date(start.setDate(start.getDate() + value));
          break;
      case 'weeks':
          targetDate = new Date(start.setDate(start.getDate() + value * 7));
          break;
      case 'months':
          targetDate = new Date(start.setMonth(start.getMonth() + value));
          break;
      default:
          throw new Error("Invalid unit. Use 'days', 'weeks', or 'months'.");
  }

  // Check if the current date has passed the target date
  return now >= targetDate;
}
