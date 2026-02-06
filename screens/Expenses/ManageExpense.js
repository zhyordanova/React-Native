import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";

import { STRINGS } from "../../constants/strings";
import IconButton from "../../UI/IconButton";
import { GlobalStyles } from "../../constants/styles";
import { ExpenseContext } from "../../store/expense-context";
import ExpenseForm from "../../components/ManageExpenses/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../../util/http";
import { UIContext } from "../../store/ui-context";

function ManageExpense({ route, navigation }) {
  const expensesCtx = useContext(ExpenseContext);
  const { setLoading, setError, clearError } = useContext(UIContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const expenseData = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? STRINGS.expense.editTitle : STRINGS.expense.addTitle,
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setLoading(true);
    clearError();

    try {
      await deleteExpense(editedExpenseId);
      expensesCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError(STRINGS.errors.deleteFailed);
    } finally {
      setLoading(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setLoading(true);
    clearError();

    try {
      if (isEditing) {
        expensesCtx.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError(STRINGS.errors.saveFailed);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={expenseData}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
