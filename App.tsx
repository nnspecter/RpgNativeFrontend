import { QueryClientProvider } from "@tanstack/react-query";
import { StyleSheet, View, useColorScheme } from "react-native";
import { queryClient } from "./api/QueryClient";
import { lightTheme, darkTheme } from "./theme/paperTheme";
import { useUserStore } from "./ZustandStore/store";
import { useEffect, useState } from "react";
import { loadToken, getTokensSync } from "./api/secureStore";
import AuthForms from "./tabs/AuthForms/AuthForms";
import Main from "./tabs/Main/Main";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "./theme/ThemeContext";
import { PaperProvider } from "react-native-paper";

export default function App() {
  const { isAuthenticated, setAuthenticated } = useUserStore();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      await loadToken(); // загружаем токены из AsyncStorage в кэш
      if (getTokensSync()?.access) {
        setAuthenticated(true); // восстанавливаем сессию
      }
      setIsReady(true);
    };
    init();
  }, []);

  if (!isReady) return null; // можно заменить на <SplashScreen />

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PaperProvider theme={isDark ? darkTheme : lightTheme}>
          <ThemeProvider>
            <View
              style={[
                styles.container,
                { backgroundColor: isDark ? "#121212" : "#F4F4F8" },
              ]}
            >
              {isAuthenticated ? <Main /> : <AuthForms />}
            </View>
          </ThemeProvider>
        </PaperProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});