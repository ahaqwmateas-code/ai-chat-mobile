import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ChatProvider } from './src/state/ChatContext';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <ChatProvider>
        <RootNavigator />
        <StatusBar style="auto" />
      </ChatProvider>
    </SafeAreaProvider>
  );
}
