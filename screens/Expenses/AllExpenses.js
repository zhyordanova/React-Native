import { StyleSheet, Text, View } from "react-native";

import { STRINGS } from "../../constants/strings";
import { GlobalStyles } from "../../constants/styles";
import { useExpense } from "../../store/expense-context";
import { useUI } from "../../store/ui-context";
import LoadingOverlay from "../../UI/LoadingOverlay";
import ExpensesList from "../../components/ExpensesOutput/ExpensesList";
import ExpensesSummary from "../../components/ExpensesOutput/ExpensesSummary";

const { colors, spacing, typography } = GlobalStyles;

function AllExpenses() {
  const { expenses } = useExpense();
  const { isLoading } = useUI();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <LoadingOverlay message={STRINGS.expense.loading} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} />
      <ExpensesList
        expenses={expenses}
        fallbackText={STRINGS.expense.empty.all}
      />
    </View>
  );
}

export default AllExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: 0,
    backgroundColor: colors.primary700,
  },
  loadingContainer: {
    marginTop: spacing.xxl,
  },
});
