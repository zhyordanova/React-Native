import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import { GlobalStyles } from "./constants/styles";
import { STRINGS } from "./constants/strings";
import { AppTheme } from "./config/AppTheme";
import AuthContextProvider, { useAuth } from "./store/auth-context";
import ExpenseContextProvider from "./store/expense-context";
import UIContextProvider from "./store/ui-context";
import GlobalUIOverlay from "./UI/GlobalUIOverlay";
import IconButton from "./UI/IconButton";
import ManageExpense from "./screens/Expenses/ManageExpense";
import AllExpenses from "./screens/Expenses/AllExpenses";
import RecentExpenses from "./screens/Expenses/RecentExpenses";
import SignupScreen from "./screens/Authentication/SignupScreen";
import LoginScreen from "./screens/Authentication/LoginScreen";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

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

  const screenOptions = useCallback(
    ({ navigation }) => ({
      tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      headerRight: (tintColor) => (
        <IconButton
          icon="add"
          size={24}
          color={tintColor.tintColor}
          onPress={() => navigation.navigate("ManageExpense")}
          accessibilityLabel={STRINGS.navigation.addExpense}
        />
      ),
      headerLeft: (tintColor) => (
        <IconButton
          icon="exit"
          size={24}
          color={tintColor.tintColor}
          onPress={() => authCtx.logout()}
          accessibilityLabel={STRINGS.navigation.logout}
        />
      ),
    }),
    [authCtx]
  );

  return (
    <BottomTabs.Navigator screenOptions={screenOptions}>
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: STRINGS.navigation.recentExpenses,
          tabBarLabel: STRINGS.navigation.recent,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: STRINGS.navigation.allExpenses,
          tabBarLabel: STRINGS.navigation.allExpenses,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
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
