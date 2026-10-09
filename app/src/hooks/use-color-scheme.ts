import { useThemePreference } from "@/contexts/theme-preference";

export function useColorScheme() {
  const { resolvedColorScheme, ready } = useThemePreference();

  if (!ready) {
    return "light" as const;
  }

  return resolvedColorScheme;
}
