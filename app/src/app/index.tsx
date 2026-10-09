import { useLingui } from "@lingui/react/macro";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";

export default function HomeScreen() {
  const { t } = useLingui();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">{t`欢迎回来`}</ThemedText>
      <ThemedText style={styles.body}>
        {t`这是应用主页，可在设置中切换语言，主题会跟随系统明暗模式。`}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  body: {
    maxWidth: 480,
  },
});
