import { useEffect, useMemo } from "react";

import { STRINGS } from "../../constants/strings";
import { getDateMinusDays } from "../../util/date";
import { fetchExpenses } from "../../util/http";
import { useExpense } from "../../store/expense-context";
import { useUI } from "../../store/ui-context";
import ExpensesOutput from "../../components/ExpensesOutput/ExpensesOutput";

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
        setError(STRINGS.errors.fetchFailed);
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
      expensesPeriod={STRINGS.expense.period.last7Days}
      fallbackText={STRINGS.expense.empty.recent}
    />
  );
}

export default RecentExpenses;
