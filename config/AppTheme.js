import { DefaultTheme } from '@react-navigation/native';
import { GlobalStyles } from '../constants/styles';

export const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: GlobalStyles.colors.primary500,
    background: GlobalStyles.colors.primary700,
    card: GlobalStyles.colors.primary500,
    text: GlobalStyles.colors.white,
    border: GlobalStyles.colors.primary400,
  },
};
