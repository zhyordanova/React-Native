import axios from "axios";

import { retryWithBackoff } from "./errorHandler";
import { throwParsedError } from "./throwError";

const BACKEDND_URL =
  "https://expensetracker-8f018-default-rtdb.firebaseio.com/";

export async function storeExpense(expenseData, userId) {
  try {
    const response = await retryWithBackoff(
      () => axios.post(BACKEDND_URL + `users/${userId}/expenses.json`, expenseData),
      3,
      1000,
    );
    const id = response.data.name;
    return id;
  } catch (error) {
    throwParsedError(error);
  }
}

export async function fetchExpenses(userId) {
  try {
    const response = await retryWithBackoff(
      () => axios.get(BACKEDND_URL + `users/${userId}/expenses.json`),
      3,
      1000,
    );

    const expenses = [];

    if (response.data) {
      for (const key in response.data) {
        const expenseObj = {
          id: key,
          amount: response.data[key].amount,
          date: new Date(response.data[key].date),
          description: response.data[key].description,
        };
        expenses.push(expenseObj);
      }
    }

    return expenses;
  } catch (error) {
    throwParsedError(error);
  }
}

export async function updateExpense(id, expenseData, userId) {
  try {
    return await retryWithBackoff(
      () => axios.put(BACKEDND_URL + `users/${userId}/expenses/${id}.json`, expenseData),
      3,
      1000,
    );
  } catch (error) {
    throwParsedError(error);
  }
}

export async function deleteExpense(id, userId) {
  try {
    return await retryWithBackoff(
      () => axios.delete(BACKEDND_URL + `users/${userId}/expenses/${id}.json`),
      3,
      1000,
    );
  } catch (error) {
    throwParsedError(error);
  }
}
