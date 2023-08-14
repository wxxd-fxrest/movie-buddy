import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Join from "../screens/Join";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "../colors"; 

const AuthStack = createNativeStackNavigator();

const AuthRoot = () => {
    const isDark = useColorScheme() === 'dark';

    return (
        <AuthStack.Navigator             
            screenOptions={{
                presentation: "modal",
                headerTintColor: "white",
                headerStyle: {
                    backgroundColor: isDark ?  darkTheme.backColor : lightTheme.headerColor,
                },
            }}>
            <AuthStack.Screen name="Login" component={Login} />
            <AuthStack.Screen name="Join" component={Join} />
        </AuthStack.Navigator>
    )
};

export default AuthRoot;