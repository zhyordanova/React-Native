import React from "react";
import { FlatList, Text, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/styles";
import ExpensesItem from "./ExpenseItem";

const { colors, spacing, typography } = GlobalStyles;

// Approximate height of each ExpenseItem (padding + margins + content)
const ITEM_HEIGHT = 80;

function renderExpensesItem(itemData) {
  return <ExpensesItem {...itemData.item} />;
}

function keyExtractor(item) {
  return item.id;
}

function getItemLayout(data, index) {
  return {
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  };
}

function ExpensesList({ expenses, fallbackText }) {
  
  return expenses.length === 0 ? (
    <Text style={styles.fallbackText}>{fallbackText}</Text>
  ) : (
    <FlatList
      data={expenses}
      renderItem={renderExpensesItem}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      removeClippedSubviews={true}
    />
  );
}

export default React.memo(ExpensesList);

const styles = StyleSheet.create({
  fallbackText: {
    color: colors.white,
    fontSize: typography.fontSize.medium,
    textAlign: "center",
    marginTop: spacing.xxl,
  },
});
