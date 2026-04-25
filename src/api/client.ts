import axios from 'axios';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

/**
 * Gets the local IP address of the development server (your computer),
 * so the physical device running Expo Go can resolve API calls automatically!
 */
const getApiUrl = () => {
  const debuggerHost = Constants.expoConfig?.hostUri;
  if (__DEV__ && debuggerHost) {
    const localIp = debuggerHost.split(':')[0];
    return `http://${localIp}:3000/api/v1`;
  }
  // Production URL fallback (update this when deploying)
  return 'http://example.com/api/v1';
};

const API_URL = getApiUrl();
console.log(`🔌 API configuring to use host: ${API_URL}`);

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Automatically inject JWT token into all requests
apiClient.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('userToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
