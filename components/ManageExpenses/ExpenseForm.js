import { useState, useCallback, useRef, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";

import Button from "../../UI/Button";
import Input from "../../UI/Input";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
      error: "",
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
      error: "",
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
      error: "",
    },
  });

  function validateInputs(values) {
    const amount = +values.amount;
    const date = new Date(values.date);
    const description = values.description.trim();

    const amountIsValid = !isNaN(amount) && amount > 0;
    const dateIsValid = date.toString() !== "Invalid Date";
    const descriptionIsValid = description.length > 0;

    return {
      amount: {
        isValid: amountIsValid,
        error: amountIsValid ? "" : "Enter a positive amount.",
      },
      date: {
        isValid: dateIsValid,
        error: dateIsValid ? "" : "Use format YYYY-MM-DD.",
      },
      description: {
        isValid: descriptionIsValid,
        error: descriptionIsValid ? "" : "Description is required.",
      },
    };
  }

  const debounceTimerRef = useRef(null);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const inputChangeHandler = useCallback((inputIdentifier, enteredValue) => {
    // Immediately update the input value for responsive UI
    setInputs((curInputs) => ({
      ...curInputs,
      [inputIdentifier]: { value: enteredValue, isValid: true, error: "" },
    }));

    // Clear existing debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Debounce validation for better performance (only validates after user stops typing)
    debounceTimerRef.current = setTimeout(() => {
      // Optional: Add real-time validation here if needed
      // For now, validation only happens on submit
    }, 300);
  }, []);

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const validation = validateInputs({
      amount: inputs.amount.value,
      date: inputs.date.value,
      description: inputs.description.value,
    });

    if (
      !validation.amount.isValid ||
      !validation.date.isValid ||
      !validation.description.isValid
    ) {
      setInputs((curInputs) => {
        return {
          amount: {
            value: curInputs.amount.value,
            isValid: validation.amount.isValid,
            error: validation.amount.error,
          },
          date: {
            value: curInputs.date.value,
            isValid: validation.date.isValid,
            error: validation.date.error,
          },
          description: {
            value: curInputs.description.value,
            isValid: validation.description.isValid,
            error: validation.description.error,
          },
        };
      });

      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}> Your Expense </Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputs.amount.isValid}
          errorText={inputs.amount.error}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputs.date.isValid}
          errorText={inputs.date.error}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        errorText={inputs.description.error}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>Please fix the highlighted fields.</Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
    fontWeight: "800",
    fontSize: 14,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
});
