import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Stack from "./Stack";
import Tab from "./Tab"; 

const RootNavigation = createNativeStackNavigator(); 

const Root = ({currentUser}) => {
    console.log(currentUser);
    return (
        <RootNavigation.Navigator 
            screenOptions={{
                presentation: "modal", 
                headerShown: false
            }}>
            <RootNavigation.Screen name="Tab" component={Tab}/>
            <RootNavigation.Screen name="Stack" component={Stack}/>
        </RootNavigation.Navigator>
    )
};

export default Root;  