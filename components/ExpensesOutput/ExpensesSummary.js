import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/styles";

const { colors, spacing, borderRadius } = GlobalStyles;
const { fontSize, fontWeight } = GlobalStyles.typography;

function ExpensesSummary({ expenses, periodName }) {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
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
        fontSize: fontSize.small,
        color: colors.primary400,
    },
    sum: {
        fontSize: fontSize.medium,
        fontWeight: fontWeight.bold,
        color: colors.primary500,
    },
});
