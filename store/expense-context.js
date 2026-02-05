import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
} from "react";

export const ExpenseContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

export function useExpense() {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpense must be used within ExpenseContextProvider");
  }
  return context;
}

function expenseReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];

    case "SET":
      const inverted = action.payload.reverse();
      return inverted;

    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id,
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;

    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);

    default:
      return state;
  }
}

function ExpenseContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expenseReducer, []);

  const addExpense = useCallback((expenseData) => {
    dispatch({ type: "ADD", payload: expenseData });
  }, []);

  const setExpenses = useCallback((expenses) => {
    dispatch({ type: "SET", payload: expenses });
  }, []);

  const deleteExpense = useCallback((id) => {
    dispatch({ type: "DELETE", payload: id });
  }, []);

  const updateExpense = useCallback((id, expenseData) => {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }, []);

  const value = useMemo(
    () => ({
      expenses: expensesState,
      addExpense: addExpense,
      setExpenses: setExpenses,
      deleteExpense: deleteExpense,
      updateExpense: updateExpense,
    }),
    [expensesState, addExpense, setExpenses, deleteExpense, updateExpense],
  );

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
}

export default ExpenseContextProvider;
