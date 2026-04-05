import { QueryClientProvider } from '@tanstack/react-query';
import { StyleSheet, Text, View } from 'react-native';
import { queryClient } from './api/QueryClient';
import { PaperProvider } from 'react-native-paper';
import { useUserStore } from './ZustandStore/store';
import { useEffect } from 'react';
import { getTokenSync, loadToken } from './api/secureStore';
import AuthForms from './tabs/AuthForms/AuthForms';
import Main from './tabs/Main/Main';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  const {user} = useUserStore();
  
  useEffect(() => {
    console.log("hello")
    loadToken(); // 🔥 загрузка токена в память
  }, [user]);
  
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <View style={styles.container}>
          {!getTokenSync() ? <AuthForms/> : <Main/>}

        </View>
      </PaperProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
