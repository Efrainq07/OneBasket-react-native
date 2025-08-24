import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Background from '@/components/UI/Background/Background';
import IntroScreen from '@/screens/IntroScreen';
import LoginScreen from '@/screens/LoginScreen';
import SignUpScreen from '@/screens/SignUpScreen';
import QuestionnaireScreen from '@/screens/QuestionnaireScreen';
import SectorQuestionnaireScreen from '@/screens/SectorQuestionnaireScreen';
import { RootMainNavigator } from '@/navigation/Navigation';
import { useAuth } from '@/context/AuthContext';
import { View, ActivityIndicator } from 'react-native';

const AppStack = createStackNavigator();

const transparentTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: 'transparent' }, // important on Android & web
};

export default function AppNavigator() {
  const { isAuthenticated, isLoading, hasCompletedQuestionnaire, hasCompletedSectorQuestionnaire } = useAuth();

  if (isLoading) {
    return (
      <Background>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#00c806" />
        </View>
      </Background>
    );
  }

  return (
    <Background>
      <NavigationContainer theme={transparentTheme}>
        <StatusBar style="light" />
        <AppStack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: 'transparent' }, // v6 key
            cardStyleInterpolator: ({ current, next, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateX: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.width, 0],
                      }),
                    },
                  ],
                  opacity: current.progress.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0, 0.5, 1],
                  }),
                },
              };
            },
          }}
        >
          {!isAuthenticated ? (
            <>
              <AppStack.Screen name="Intro" component={IntroScreen} />
              <AppStack.Screen name="Login" component={LoginScreen} />
              <AppStack.Screen name="SignUp" component={SignUpScreen} />
            </>
          ) : !hasCompletedQuestionnaire ? (
            <AppStack.Screen name="Questionnaire" component={QuestionnaireScreen} />
          ) : !hasCompletedSectorQuestionnaire ? (
            <AppStack.Screen name="SectorQuestionnaire" component={SectorQuestionnaireScreen} />
          ) : (
            <AppStack.Screen name="MainApp" component={RootMainNavigator} />
          )}
        </AppStack.Navigator>
      </NavigationContainer>
    </Background>
  );
}
