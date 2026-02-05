import axios from "axios";
import { parseError, retryWithBackoff } from "./errorHandler";

const BACKEDND_URL =
  "https://expensetracker-8f018-default-rtdb.firebaseio.com/";

export async function storeExpense(expenseData) {
  try {
    const response = await retryWithBackoff(
      () => axios.post(BACKEDND_URL + "expenses.json", expenseData),
      3,
      1000,
    );
    const id = response.data.name;
    return id;
  } catch (error) {
    const errorInfo = parseError(error);
    const err = new Error(errorInfo.message);
    err.type = errorInfo.type;
    err.retry = errorInfo.retry;
    throw err;
  }
}

export async function fetchExpenses() {
  try {
    const response = await retryWithBackoff(
      () => axios.get(BACKEDND_URL + "expenses.json"),
      3,
      1000,
    );

    const expenses = [];

    for (const key in response.data) {
      const expenseObj = {
        id: key,
        amount: response.data[key].amount,
        date: new Date(response.data[key].date),
        description: response.data[key].description,
      };
      expenses.push(expenseObj);
    }

    return expenses;
  } catch (error) {
    const errorInfo = parseError(error);
    const err = new Error(errorInfo.message);
    err.type = errorInfo.type;
    err.retry = errorInfo.retry;
    throw err;
  }
}

export async function updateExpense(id, expenseData) {
  try {
    return await retryWithBackoff(
      () => axios.put(BACKEDND_URL + `expenses/${id}.json`, expenseData),
      3,
      1000,
    );
  } catch (error) {
    const errorInfo = parseError(error);
    const err = new Error(errorInfo.message);
    err.type = errorInfo.type;
    err.retry = errorInfo.retry;
    throw err;
  }
}

export async function deleteExpense(id) {
  try {
    return await retryWithBackoff(
      () => axios.delete(BACKEDND_URL + `expenses/${id}.json`),
      3,
      1000,
    );
  } catch (error) {
    const errorInfo = parseError(error);
    const err = new Error(errorInfo.message);
    err.type = errorInfo.type;
    err.retry = errorInfo.retry;
    throw err;
  }
}
