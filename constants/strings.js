// UI Labels, Navigation Titles, and User-Facing Text
export const STRINGS = {
  // Navigation
  navigation: {
    recentExpenses: 'Recent Expenses',
    allExpenses: 'All Expenses',
    recent: 'Recent',
    addExpense: 'Add new expense',
    logout: 'Logout',
  },

  // Expense Management
  expense: {
    editTitle: 'Edit Expense',
    addTitle: 'Add Expense',
    period: {
      last7Days: 'Last 7 Days',
      total: 'Total',
    },
    empty: {
      recent: 'No expenses registered for the last 7 days.',
      all: 'No registered expenses found!',
    },
    validation: {
      amountPositive: 'Enter a positive amount.',
      dateFormat: 'Use format YYYY-MM-DD.',
      descriptionRequired: 'Description is required.',
    },
  },

  // Authentication
  auth: {
    buttons: {
      createAccount: 'Create a new user',
      switchToLogin: 'Log in instead',
      retry: 'Retry',
      ok: 'OK',
    },
    alerts: {
      invalidInput: 'Invalid input',
      loginFailed: 'Login Failed',
      signupFailed: 'Sign Up Failed',
      checkCredentials: 'Please check your entered credentials.',
    },
    validation: {
      invalidEmail: 'Please enter a valid email address.',
      emailMismatch: 'Email addresses do not match.',
      passwordLength: 'Password must be at least 6 characters.',
      passwordMismatch: 'Passwords do not match.',
    },
  },

  // Error Messages
  errors: {
    loginFailed: 'Login failed. Please try again.',
    signupFailed: 'Sign up failed. Please try again.',
    deleteFailed: 'Could not delete expense - please try again later!',
    saveFailed: 'Could not save data - please try again later!',
    fetchFailed: 'Could not fetch expenses!',
  },
};
