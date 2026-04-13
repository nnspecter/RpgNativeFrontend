import AsyncStorage from "@react-native-async-storage/async-storage";

const ACCESS_KEY = "access_token";
const REFRESH_KEY = "refresh_token";

let cachedAccess: string | null = null;
let cachedRefresh: string | null = null;

// Вызывается один раз при старте приложения
export const loadToken = async () => {
  const [access, refresh] = await Promise.all([
    AsyncStorage.getItem(ACCESS_KEY),
    AsyncStorage.getItem(REFRESH_KEY),
  ]);
  cachedAccess = access;
  cachedRefresh = refresh;
};

export const saveTokens = async (access: string, refresh?: string) => {
  cachedAccess = access;
  await AsyncStorage.setItem(ACCESS_KEY, access);

  if (refresh) {
    cachedRefresh = refresh;
    await AsyncStorage.setItem(REFRESH_KEY, refresh);
  }
};

export const getTokensSync = () => {
  if (!cachedAccess) return null;
  return {
    access: cachedAccess,
    refresh: cachedRefresh,
  };
};

export const deleteTokens = async () => {
  cachedAccess = null;
  cachedRefresh = null;
  await Promise.all([
    AsyncStorage.removeItem(ACCESS_KEY),
    AsyncStorage.removeItem(REFRESH_KEY),
  ]);
};