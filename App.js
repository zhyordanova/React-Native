import { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Ionicons } from "@expo/vector-icons";

import { GlobalStyles } from "./constants/styles";
import { STRINGS } from "./constants/strings";

import AuthContextProvider, { useAuth } from "./store/auth-context";
import ExpenseContextProvider, { useExpense } from "./store/expense-context";
import UIContextProvider, { useUI } from "./store/ui-context";
import { fetchExpenses } from "./util/http";
import { AppTheme } from "./config/AppTheme";
import GlobalUIOverlay from "./UI/GlobalUIOverlay";
import IconButton from "./UI/IconButton";
import ManageExpense from "./screens/Expenses/ManageExpense";
import AllExpenses from "./screens/Expenses/AllExpenses";
import RecentExpenses from "./screens/Expenses/RecentExpenses";
import SignupScreen from "./screens/Authentication/SignupScreen";
import LoginScreen from "./screens/Authentication/LoginScreen";

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

const { errors, navigation } = STRINGS;

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ExpensesOverview"
        component={ExpensesOverview}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManageExpense"
        component={ManageExpense}
        options={{
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
}

function ExpensesOverview() {
  const authCtx = useAuth();
  const { setExpenses, clearExpenses } = useExpense();
  const { setLoading, setError, clearError } = useUI();

  useEffect(() => {
    if (!authCtx.isAuthenticated) {
      // Clear expenses when user logs out
      clearExpenses();
      return;
    }

    async function loadExpenses() {
      setLoading(true);
      clearError();

      try {
        const fetchedExpenses = await fetchExpenses(authCtx.userId);
        setExpenses(fetchedExpenses);
      } catch (error) {
        setError(errors.fetchFailed);
      } finally {
        setLoading(false);
      }
    }

    loadExpenses();
  }, [authCtx.isAuthenticated, authCtx.userId, setExpenses, clearExpenses, setLoading, setError, clearError]);

  const screenOptions = useCallback(
    ({ navigation }) => ({
      tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      headerRight: () => (
        <IconButton
          icon="add"
          size={24}
          color={GlobalStyles.colors.white}
          onPress={() => navigation.navigate("ManageExpense")}
          accessibilityLabel={navigation.addExpense}
        />
      ),
      headerLeft: () => (
        <IconButton
          icon="exit"
          size={24}
          color={GlobalStyles.colors.white}
          onPress={() => authCtx.logout()}
          accessibilityLabel={navigation.logout}
        />
      ),
    }),
    [authCtx],
  );

  return (
    <BottomTabs.Navigator screenOptions={screenOptions}>
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: navigation.allExpenses,
          tabBarLabel: navigation.allExpenses,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: navigation.recentExpenses,
          tabBarLabel: navigation.recent,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

function Navigation() {
  const authCtx = useAuth();
  const [initialState, setInitialState] = useState();

  useEffect(() => {
    async function getInitialState() {
      try {
        const savedState = await AsyncStorage.getItem("navigationState");
        if (savedState) {
          setInitialState(JSON.parse(savedState));
        } else {
          setInitialState(undefined);
        }
      } catch (error) {
        console.error("Failed to restore navigation state:", error);
        setInitialState(undefined);
      }
    }
    getInitialState();
  }, []);

  async function onNavigationStateChange(state) {
    try {
      await AsyncStorage.setItem("navigationState", JSON.stringify(state));
    } catch (error) {
      console.error("Failed to save navigation state:", error);
    }
  }

  if (authCtx.isInitializing) {
    return null;
  }

  return (
    <NavigationContainer
      theme={AppTheme}
      initialState={initialState}
      onStateChange={onNavigationStateChange}
    >
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <UIContextProvider>
          <ExpenseContextProvider>
            <Navigation />
          </ExpenseContextProvider>
          <GlobalUIOverlay />
        </UIContextProvider>
      </AuthContextProvider>
    </>
  );
}
