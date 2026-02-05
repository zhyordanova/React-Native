import React from "react";
import { FlatList } from "react-native";

import ExpensesItem from "./ExpenseItem";

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

function ExpensesList({ expenses }) {
  return (
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
