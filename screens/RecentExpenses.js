import { useContext } from "react";
import ExpensesOutput from "../componets/ExpensesOutput/ExpensesOutput";
import { ExpenseContext } from "../store/expense-contex";
import { getDateMinusDays } from "../util/date";

function RecentExpenses() {
  const expensesCtx = useContext(ExpenseContext);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
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
