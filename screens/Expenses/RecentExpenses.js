import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { STRINGS } from "../../constants/strings";
import { GlobalStyles } from "../../constants/styles";
import { getDateMinusDays } from "../../util/date";
import { useExpense } from "../../store/expense-context";
import { useUI } from "../../store/ui-context";
import LoadingOverlay from "../../UI/LoadingOverlay";
import ExpensesList from "../../components/ExpensesOutput/ExpensesList";
import ExpensesSummary from "../../components/ExpensesOutput/ExpensesSummary";

const { colors, spacing, typography } = GlobalStyles;

function RecentExpenses() {
  const { expenses } = useExpense();
  const { isLoading } = useUI();

  const recentExpenses = useMemo(() => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expenses.filter(
      (expense) => expense.date >= date7DaysAgo && expense.date <= today,
    );
  }, [expenses]);

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
      <ExpensesSummary expenses={recentExpenses} />
      <ExpensesList
        expenses={recentExpenses}
        fallbackText={STRINGS.expense.empty.recent}
      />
    </View>
  );
}

export default RecentExpenses;

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
