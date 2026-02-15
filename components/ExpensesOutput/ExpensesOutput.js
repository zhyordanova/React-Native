import { StyleSheet, Text, View } from "react-native";

import { GlobalStyles } from "../../constants/styles";
import { STRINGS } from "../../constants/strings";
import LoadingOverlay from "../../UI/LoadingOverlay";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

const { colors, spacing, typography } = GlobalStyles;

function ExpensesOutput({ expenses, fallbackText, isLoading }) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (isLoading) {
    content = (
      <View style={styles.loadingContainer}>
        <LoadingOverlay message={STRINGS.expense.loading} />
      </View>
    );
  } else if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }

  return (
    <View style={styles.container}>
      {expenses.length > 0 && <ExpensesSummary expenses={expenses} />}
      {content}
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: 0,
    backgroundColor: colors.primary700,
  },
  infoText: {
    color: colors.white,
    fontSize: typography.fontSize.medium,
    textAlign: "center",
    marginTop: spacing.xxl,
  },
  loadingContainer: {
    marginTop: spacing.xxl,
  },
});
