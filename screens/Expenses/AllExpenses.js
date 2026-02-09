import { useContext } from "react";

import { STRINGS } from "../../constants/strings";
import { ExpenseContext } from "../../store/expense-context";
import ExpensesOutput from "../../components/ExpensesOutput/ExpensesOutput";

function AllExpenses() {
  const expensesCtx = useContext(ExpenseContext);

  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      expensesPeriod={STRINGS.expense.period.total}
      fallbackText={STRINGS.expense.empty.all}
    />
  );
}

export default AllExpenses;
