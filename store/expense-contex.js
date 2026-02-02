import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  // Last 7 days (2026-01-24 to 2026-01-31)
  {
    id: "e1",
    description: "Coffee",
    amount: 5.99,
    date: new Date("2026-01-31"),
  },
  {
    id: "e2",
    description: "Lunch",
    amount: 15.50,
    date: new Date("2026-01-31"),
  },
  {
    id: "e3",
    description: "Gas",
    amount: 45.00,
    date: new Date("2026-01-30"),
  },
  {
    id: "e4",
    description: "Groceries",
    amount: 82.35,
    date: new Date("2026-01-30"),
  },
  {
    id: "e5",
    description: "Movie Tickets",
    amount: 28.00,
    date: new Date("2026-01-29"),
  },
  {
    id: "e6",
    description: "Restaurant",
    amount: 65.50,
    date: new Date("2026-01-29"),
  },
  {
    id: "e7",
    description: "Book",
    amount: 22.99,
    date: new Date("2026-01-28"),
  },
  {
    id: "e8",
    description: "Gym Membership",
    amount: 50.00,
    date: new Date("2026-01-27"),
  },
  {
    id: "e9",
    description: "Shopping",
    amount: 120.00,
    date: new Date("2026-01-26"),
  },
  {
    id: "e10",
    description: "Dinner",
    amount: 45.75,
    date: new Date("2026-01-25"),
  },
  {
    id: "e11",
    description: "Coffee",
    amount: 4.99,
    date: new Date("2026-01-25"),
  },
  {
    id: "e12",
    description: "Groceries",
    amount: 95.20,
    date: new Date("2026-01-24"),
  },
  // Older expenses (before last 7 days)
  {
    id: "e13",
    description: "Hotel Stay",
    amount: 250.00,
    date: new Date("2026-01-20"),
  },
  {
    id: "e14",
    description: "Flight Ticket",
    amount: 450.00,
    date: new Date("2026-01-18"),
  },
  {
    id: "e15",
    description: "Restaurant Dinner",
    amount: 85.50,
    date: new Date("2026-01-15"),
  },
  {
    id: "e16",
    description: "Electronics",
    amount: 199.99,
    date: new Date("2026-01-12"),
  },
  {
    id: "e17",
    description: "Monthly Rent",
    amount: 1200.00,
    date: new Date("2026-01-10"),
  },
  {
    id: "e18",
    description: "Clothing",
    amount: 75.00,
    date: new Date("2026-01-05"),
  },
];

export const ExpenseContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => {},
    setExpenses: (expenses) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, { description, amount, date }) => {},
});

function expenseReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{ ...action.payload, id: id }, ...state];

        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = { ...updatableExpense, ...action.payload.data };
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;

        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload);

        default:
            return state;
    }
};

function ExpenseContextProvider({ children }) {

    const [expensesState, dispatch] = useReducer(expenseReducer, DUMMY_EXPENSES);

    function addExpense(expenseData) {
        dispatch({ type: 'ADD', payload: expenseData });
    };

    function deleteExpense(id) {
        dispatch({ type: 'DELETE', payload: id });
    };

    function updateExpense(id, expenseData) {
        dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
    };

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
    };

    return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
};

export default ExpenseContextProvider;