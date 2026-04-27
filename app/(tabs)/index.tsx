// app/tabs/index.tsx

import React from 'react';
import { StatusBar } from 'expo-status-bar';  // Untuk status bar aplikasi
import { AppProvider } from '../../src/context/AppContext'; // Mengimpor context untuk state management
import AppNavigator from '../../src/navigation/AppNavigator';  // Navigasi utama aplikasi
import { NavigationContainer } from '@react-navigation/native';  // Membungkus aplikasi dengan NavigationContainer

const IndexScreen = () => {
  return (
    <AppProvider>
      <NavigationContainer> {/* Pastikan hanya satu NavigationContainer di sini */}
        <AppNavigator /> {/* Menggunakan AppNavigator untuk navigasi antar tab */}
      </NavigationContainer>
      <StatusBar style="auto" />
    </AppProvider>
  );
};

export default IndexScreen;