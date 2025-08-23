import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './navigation/appNavigator';
import { AuthProvider } from './context/AuthContext';






export default function App() {


  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}


