import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './Background.styles';

export default function Background({ children }) {
  return (
    <LinearGradient
      colors={['#0D1B2A', '#000000']}
      locations={[0, 1]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        {children}
      </SafeAreaView>
    </LinearGradient>
  );
}

