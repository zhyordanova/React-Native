import { useEffect, useMemo } from "react";

import ExpensesOutput from "../../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../../util/date";
import { fetchExpenses } from "../../util/http";
import { useExpense } from "../../store/expense-context";
import { useUI } from "../../store/ui-context";

function RecentExpenses() {
  const { expenses, setExpenses } = useExpense();
  const { setLoading, setError, clearError } = useUI();

  useEffect(() => {
    async function getExpenses() {
      setLoading(true);
      clearError();

      try {
        const fetchedExpenses = await fetchExpenses();
        setExpenses(fetchedExpenses);
      } catch (error) {
        setError("Could not fetch expenses!");
      }

      setLoading(false);
    }

    getExpenses();
  }, [setExpenses, setLoading, setError, clearError]);

  const recentExpenses = useMemo(() => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expenses.filter(
      (expense) => expense.date >= date7DaysAgo && expense.date <= today,
    );
  }, [expenses]);

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
}

export default RecentExpenses;
