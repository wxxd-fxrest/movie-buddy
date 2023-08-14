import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "../colors";
import Write from "../screens/Write";
import Setup from "../screens/Setup";
import Review from "../screens/Review";
import Detail from "../screens/Detail";

const NativeStack = createNativeStackNavigator();

const Stack = () => {
    const isDark = useColorScheme() === 'dark';
    // console.log(isDark)

    return (
        <NativeStack.Navigator 
            screenOptions={{
                headerBackVisible: true,
                headerBackTitleVisible: true,
                headerStyle: {
                    backgroundColor: isDark ? darkTheme.backColor : lightTheme.headerColor,
                },
                headerTitleStyle: {
                    color: "white",
                },
                contentStyle: {
                    backgroundColor: isDark ? darkTheme.headerColor : "white",
                }
            }}>
            <NativeStack.Screen name="Write" component={Write}/>
            <NativeStack.Screen name="Review" component={Review}/>
            <NativeStack.Screen name="Setup" component={Setup}/>
            <NativeStack.Screen name="Detail" component={Detail}/>
        </NativeStack.Navigator>
    )
};

export default Stack; 