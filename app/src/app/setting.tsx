import { useLingui } from "@lingui/react/macro";
import { Pressable, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { useThemePreference, type ThemePreference } from "@/contexts/theme-preference";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function SettingScreen() {
  const { t, i18n } = useLingui();
  const { preference, setPreference } = useThemePreference();
  const colorScheme = useColorScheme();
  const themeLabel = colorScheme === "dark" ? t`深色` : t`浅色`;

  const themeOptions: { value: ThemePreference; label: string }[] = [
    { value: "system", label: t`跟随系统` },
    { value: "light", label: t`浅色` },
    { value: "dark", label: t`深色` },
  ];

  const localeOptions: { value: string; label: string }[] = [
    { value: "zh", label: "中文" },
    { value: "en", label: "English" },
    { value: "ja", label: "日本語" },
  ];

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">{t`设置`}</ThemedText>

      <ThemedView type="backgroundElement" style={styles.section}>
        <ThemedText type="smallBold">{t`外观`}</ThemedText>
        {preference === "system" ? (
          <ThemedText type="small" themeColor="textSecondary">
            {t`主题跟随系统设置自动切换`}
          </ThemedText>
        ) : null}
        <ThemedText type="small">{t`当前：${themeLabel}`}</ThemedText>
        <ThemedView style={styles.row}>
          {themeOptions.map((option) => (
            <Pressable
              key={option.value}
              onPress={() => setPreference(option.value)}
              style={({ pressed }) => pressed && styles.pressed}
            >
              <ThemedView
                type={preference === option.value ? "backgroundSelected" : "background"}
                style={styles.chip}
              >
                <ThemedText type="small">{option.label}</ThemedText>
              </ThemedView>
            </Pressable>
          ))}
        </ThemedView>
      </ThemedView>

      <ThemedView type="backgroundElement" style={styles.section}>
        <ThemedText type="smallBold">{t`语言`}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {t`选择界面显示语言`}
        </ThemedText>
        <ThemedView style={styles.row}>
          {localeOptions.map((option) => (
            <Pressable
              key={option.value}
              onPress={() => i18n.activate(option.value)}
              style={({ pressed }) => pressed && styles.pressed}
            >
              <ThemedView
                type={i18n.locale === option.value ? "backgroundSelected" : "background"}
                style={styles.chip}
              >
                <ThemedText type="small">{option.label}</ThemedText>
              </ThemedView>
            </Pressable>
          ))}
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.four,
    gap: Spacing.four,
  },
  section: {
    padding: Spacing.three,
    borderRadius: Spacing.three,
    gap: Spacing.two,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.two,
  },
  chip: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.two,
    borderRadius: Spacing.two,
  },
  pressed: {
    opacity: 0.7,
  },
});
