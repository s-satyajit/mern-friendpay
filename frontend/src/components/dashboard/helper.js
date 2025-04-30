import {
  addWeeks,
  startOfWeek,
  format,
  differenceInDays,
  isSameDay,
  isAfter,
  isBefore,
} from "date-fns";

export const generateWeeklyBuckets = () => {
  const today = new Date();
  return Array.from({ length: 8 }).map((_, index) => {
    const weekStart = startOfWeek(addWeeks(today, index), { weekStartsOn: 1 });
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    return {
      weekNumber: index + 1,
      start: weekStart,
      end: weekEnd,
      label: `${format(weekStart, "MMM dd")} - ${format(weekEnd, "MMM dd")}`,
    };
  });
};

export const calculateWeeklyAmounts = (
  transactions,
  friends,
  weeklyBuckets
) => {
  if (!transactions?.length || !friends?.length) {
    return weeklyBuckets.map((week) => ({
      ...week,
      friendTotals: [],
      weekTotal: 0,
    }));
  }
  return weeklyBuckets.map((week) => {
    const weekTransactions = transactions.filter((transaction) => {
      const dueDate = new Date(transaction.dueDate);
      return (
        (isAfter(dueDate, week.start) || isSameDay(dueDate, week.start)) &&
        (isBefore(dueDate, week.end) || isSameDay(dueDate, week.end))
      );
    });

    const friendTotals = friends.map((friend) => {
      const netAmount = weekTransactions
        .filter(
          (transaction) =>
            transaction.friend && transaction.friend._id === friend._id
        )
        .reduce((total, transaction) => {
          const amount =
            transaction.direction === "paid"
              ? -transaction.amount
              : transaction.amount;
          return total + amount;
        }, 0);

      return { friendId: friend._id, netAmount };
    });

    const weekTotal = friendTotals.reduce((sum, ft) => sum + ft.netAmount, 0);
    return { ...week, friendTotals, weekTotal };
  });
};
