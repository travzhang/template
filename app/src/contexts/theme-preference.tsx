import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { Platform, useColorScheme as useSystemColorScheme } from "react-native";

const STORAGE_KEY = "theme-preference";

export type ThemePreference = "system" | "light" | "dark";

type ThemePreferenceContextValue = {
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
  resolvedColorScheme: "light" | "dark";
  ready: boolean;
};

const ThemePreferenceContext = createContext<ThemePreferenceContextValue | null>(null);

function isThemePreference(value: string | null): value is ThemePreference {
  return value === "system" || value === "light" || value === "dark";
}

async function readStoredPreference(): Promise<ThemePreference> {
  try {
    if (Platform.OS === "web") {
      if (typeof localStorage === "undefined") {
        return "system";
      }
      const stored = localStorage.getItem(STORAGE_KEY);
      return isThemePreference(stored) ? stored : "system";
    }
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    return isThemePreference(stored) ? stored : "system";
  } catch {
    return "system";
  }
}

async function writeStoredPreference(preference: ThemePreference) {
  try {
    if (Platform.OS === "web") {
      localStorage.setItem(STORAGE_KEY, preference);
      return;
    }
    await AsyncStorage.setItem(STORAGE_KEY, preference);
  } catch {
    // ignore persistence errors
  }
}

export function ThemePreferenceProvider({ children }: PropsWithChildren) {
  const systemScheme = useSystemColorScheme();
  const [preference, setPreferenceState] = useState<ThemePreference>("system");
  const [ready, setReady] = useState(Platform.OS !== "web");

  useEffect(() => {
    let mounted = true;
    void readStoredPreference().then((stored) => {
      if (mounted) {
        setPreferenceState(stored);
        setReady(true);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next);
    void writeStoredPreference(next);
  }, []);

  const resolvedColorScheme = useMemo((): "light" | "dark" => {
    if (preference === "light" || preference === "dark") {
      return preference;
    }
    return systemScheme === "dark" ? "dark" : "light";
  }, [preference, systemScheme]);

  const value = useMemo(
    () => ({
      preference,
      setPreference,
      resolvedColorScheme,
      ready,
    }),
    [preference, setPreference, resolvedColorScheme, ready],
  );

  return (
    <ThemePreferenceContext.Provider value={value}>{children}</ThemePreferenceContext.Provider>
  );
}

export function useThemePreference() {
  const context = useContext(ThemePreferenceContext);
  if (!context) {
    throw new Error("useThemePreference must be used within ThemePreferenceProvider");
  }
  return context;
}
