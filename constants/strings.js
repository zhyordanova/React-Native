// UI Labels, Navigation Titles, and User-Facing Text
export const STRINGS = {
  // Navigation
  navigation: {
    recentExpenses: "Recent Expenses",
    allExpenses: "All Expenses",
    recent: "Recent",
    addExpense: "Add new expense",
    logout: "Logout",
  },

  // Expense Management
  expense: {
    yourExpense: "Your Expense",
    editTitle: "Edit Expense",
    addTitle: "Add Expense",
    form: {
      amount: "Amount",
      date: "Date",
      dateFormat: "YYYY-MM-DD",
      description: "Description",
      invalidFields: "Please fix the highlighted fields.",
    },
    total: "Total:",
    empty: {
      recent: "No expenses registered for the last 7 days.",
      all: "No registered expenses found!",
    },
    loading: "Loading expenses...",
    validation: {
      amountPositive: "Enter a positive amount.",
      dateFormat: "Use format YYYY-MM-DD.",
      descriptionRequired: "Description is required.",
    },
  },

  // Authentication
  auth: {
    buttons: {
      createAccount: "Create a new user",
      switchToLogin: "Log in instead",
      retry: "Retry",
      ok: "OK",
      login: "Log In",
      signup: "Sign Up",
    },
    alerts: {
      invalidInput: "Invalid input",
      loginFailed: "Login Failed",
      signupFailed: "Sign Up Failed",
      checkCredentials: "Please check your entered credentials.",
    },
    validation: {
      invalidEmail: "Please enter a valid email address.",
      emailMismatch: "Email addresses do not match.",
      passwordLength: "Password must be at least 6 characters.",
      passwordMismatch: "Passwords do not match.",
    },
    passwordVisibility: {
      show: "Show password",
      hide: "Hide password",
      toggle: "Toggle password visibility",
    },
    form: {
      emailAddress: "Email Address",
      confirmEmailAddress: "Confirm Email Address",
      password: "Password",
      confirmPassword: "Confirm Password",
    },
  },

  // Error Messages
  errors: {
    occurred: "An error occurred!",
    loginFailed: "Login failed. Please try again.",
    signupFailed: "Sign up failed. Please try again.",
    deleteFailed: "Could not delete expense - please try again later!",
    saveFailed: "Could not save data - please try again later!",
    fetchFailed: "Could not fetch expenses!",

    // Network & Server Errors
    network:
      "Network error. Please check your internet connection and try again.",
    server:
      "Server error. Please try again later. If the problem persists, contact support.",
    unauthorized: "Unauthorized. Please log in again.",
    tooManyRequests: "Too many requests. Please try again in a few moments.",
    unknown: "An unknown error occurred. Please try again.",
    serverError: "Server error: ",
    errorOccurred: "Error: ",
    tryAgainLater: ". Please try again later.",
    tryAgain: ". Please try again.",

    // Firebase Specific Errors
    firebase: {
      emailExists:
        "Email already exists. Please use a different email or log in.",
      operationNotAllowed:
        "This operation is not allowed. Please try again later.",
      tooManyAttempts:
        "Too many failed login attempts. Please try again in a few minutes.",
      emailNotFound: "Email not found. Please check your email or sign up.",
      invalidPassword: "Invalid password. Please try again.",
      userDisabled: "This account has been disabled. Please contact support.",
      invalidEmail: "Invalid email format. Please enter a valid email.",
      weakPassword:
        "Password is too weak. Please use at least 6 characters including letters and numbers.",
    },
  },

  // UI Buttons
  buttons: {
    okay: "Okay",
    cancel: "Cancel",
    save: "Save",
    delete: "Delete",
    add: "Add",
    update: "Update",
  },
};
