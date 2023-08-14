import React, { useEffect, useState } from 'react';
import AppLoading from "expo-app-loading"; 
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, useColorScheme } from 'react-native';
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons"
import Root from './navigation/Root';
import SplashScreen from 'react-native-splash-screen';
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from './colors';
import auth from '@react-native-firebase/auth';
import AuthRoot from './navigation/AuthRoot';
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

export default function App() {
    const [ready, setReady] = useState(false);
    const [isAuthentication, setIsAuthentication] = useState(false); 
    const [currentUser, setCurrentUser] = useState({}) ;

    useEffect(() => {
        auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
            if(user) {
                setIsAuthentication(true);
            } else {
                setIsAuthentication(false);
            }
        })
    }, []);

    const onFinish = () => setReady(true);

    const startLoading = async () => {
        const fonts = loadFonts([Ionicons.font]);
        await Promise.all([...fonts]);
    };

    const isDark = useColorScheme() === 'dark';

    useEffect(() => {
        SplashScreen.hide();
    }, []);

    if (!ready) {
        return (
            <AppLoading
                startAsync={startLoading}
                onFinish={onFinish}
                onError={console.error}
            />
        );
    }

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
                <NavigationContainer>
                    <StatusBar barStyle="light-content"/>
                    {isAuthentication ? <Root /> : <AuthRoot />}
                </NavigationContainer>
            </ThemeProvider>
        </QueryClientProvider>
    );
};