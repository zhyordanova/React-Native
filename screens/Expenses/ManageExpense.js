import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";

import { STRINGS } from "../../constants/strings";
import { GlobalStyles } from "../../constants/styles";
import { UIContext } from "../../store/ui-context";
import { ExpenseContext } from "../../store/expense-context";
import { deleteExpense, storeExpense, updateExpense } from "../../util/http";
import ExpenseForm from "../../components/ManageExpenses/ExpenseForm";
import IconButton from "../../UI/IconButton";

const { colors, spacing } = GlobalStyles;
const { expense, errors, buttons } = STRINGS;

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
      title: isEditing ? expense.editTitle : expense.addTitle,
      headerLeft: () => (
        <IconButton
          icon="chevron-back"
          size={24}
          color={GlobalStyles.colors.white}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back"
        />
      ),
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
      setError(errors.deleteFailed);
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
      setError(errors.saveFailed);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={
          isEditing ? buttons.update : buttons.add
        }
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={expenseData}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={colors.error500}
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
    padding: spacing.xl,
    backgroundColor: colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: spacing.md,
    borderTopWidth: 2,
    borderTopColor: colors.primary200,
    alignItems: "center",
  },
});
