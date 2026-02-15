import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/styles";
import { STRINGS } from "../../constants/strings";

const { colors, spacing, borderRadius, typography } = GlobalStyles;

function ExpensesSummary({ expenses }) {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{STRINGS.expense.total}</Text>
      <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}

export default React.memo(ExpensesSummary);

const styles = StyleSheet.create({
    container: {
        padding: spacing.md,
        backgroundColor: colors.primary50,
        borderRadius: borderRadius.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    period: {
        fontSize: typography.fontSize.small,
        color: colors.primary400,
    },
    sum: {
        fontSize: typography.fontSize.medium,
        fontWeight: "bold",
        color: colors.primary500,
    },
});
