import { I18nProvider } from "@lingui/react";
import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router";
import { useColorScheme, View } from "react-native";

import AppTabs from "@/components/app-tabs";
import { ThemePreferenceProvider } from "@/contexts/theme-preference";
import { i18n } from "@/i18n";

function RootNavigation() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <View style={{ flex: 1 }}>
        <AppTabs />
      </View>
    </ThemeProvider>
  );
}

export default function TabLayout() {
  return (
    <I18nProvider i18n={i18n}>
      <ThemePreferenceProvider>
        <RootNavigation />
      </ThemePreferenceProvider>
    </I18nProvider>
  );
}
