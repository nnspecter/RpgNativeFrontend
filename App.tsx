import { QueryClientProvider } from '@tanstack/react-query';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { queryClient } from './api/QueryClient';
import { lightTheme, darkTheme } from './theme/paperTheme';
import { useUserStore } from './ZustandStore/store';
import { useEffect, useState } from 'react';
import { getTokenSync, loadToken } from './api/secureStore';
import AuthForms from './tabs/AuthForms/AuthForms';
import Main from './tabs/Main/Main';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from './theme/ThemeContext';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  const { user } = useUserStore();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [isReady, setIsReady] = useState(false); // ← добавить
  
  useEffect(() => {
    loadToken().then(() => setIsReady(true)); // ← ждём загрузки
  }, []); // ← убрать зависимость от user

  if (!isReady) return null; // или <SplashScreen />

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PaperProvider theme={isDark ? darkTheme : lightTheme}>
          <ThemeProvider>
            <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#F4F4F8' }]}>
              {!getTokenSync() ? <AuthForms /> : <Main />}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});