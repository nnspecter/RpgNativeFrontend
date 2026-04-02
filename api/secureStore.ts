import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'jwt_token';

let cachedToken: string | null = null;

export const loadToken = async () => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  cachedToken = token;
};

export const saveToken = async (token: string) => {
  cachedToken = token;
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

export const getTokenSync = () => {
  return cachedToken;
};

export const deleteToken = async () => {
  cachedToken = null;
  await AsyncStorage.removeItem(TOKEN_KEY);
};