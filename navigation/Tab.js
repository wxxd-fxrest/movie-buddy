import React from "react";
import { useColorScheme } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import { colors, darkTheme, lightTheme } from "../colors";
import styled from "styled-components";
import Profile from "../screens/Profile";
import Main from "../screens/Main";

const NativeTab = createBottomTabNavigator();

const Tab = () => {
    const isDark = useColorScheme() === 'dark';
    const navigation = useNavigation();
    const goDetail = () => {
        navigation.navigate("Stack", {screen: "Setup"});
    };

    return (
        <NativeTab.Navigator
            screenOptions={{
                unmountOnBlur: true, 
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: isDark ? darkTheme.backColor : lightTheme.headerColor,
                },
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: colors.lightGreyColor,
                headerStyle: {
                    backgroundColor: isDark ? darkTheme.backColor : lightTheme.headerColor,
                },
                headerTitleStyle: {
                    color: "white",
                },
                tabBarIconStyle: {
                    marginTop: 10,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "700", 
                    marginBottom: -8,
                },
                headerRight: () => (
                    <SetupButton onPress={goDetail}>
                        <Feather name="settings" color="white" size={22} />
                    </SetupButton>
                )
            }}
            sceneContainerStyle={{
                backgroundColor: isDark ? darkTheme.backColor : "white",
            }}>

            <NativeTab.Screen name="Movie Buddy" component={Main} 
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({focused, color, size}) => {
                        return <Ionicons name={focused ? "home" : "home-outline"} color={color} size={size} />
                    }
                }} 
            />

            <NativeTab.Screen name="Profile" component={Profile} options={{
                tabBarIcon: ({focused, color, size}) => {
                    return <Ionicons name={focused ? "ios-person-sharp" : "ios-person-outline"} color={color} size={size} />
                }
            }}/>

        </NativeTab.Navigator>
    )
};

const SetupButton = styled.TouchableOpacity`
    margin-right: 20px;
`;

export default Tab; 