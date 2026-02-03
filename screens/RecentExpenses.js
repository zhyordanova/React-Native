import { useContext, useEffect } from "react";

import ExpensesOutput from "../componets/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import { ExpenseContext } from "../store/expense-contex";
import { UIContext } from "../store/ui-context";

function RecentExpenses() {
  const { expenses, setExpenses } = useContext(ExpenseContext);
  const { setLoading, setError, clearError } = useContext(UIContext);

  //   const [fetchedExpenses, setFetchedExpenses] = useState([]);

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

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
}

export default RecentExpenses;
