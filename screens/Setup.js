import React from "react";
import { Alert, useColorScheme } from "react-native"; 
import styled from "styled-components";
import auth from '@react-native-firebase/auth';

const Setup = () => {
    const isDark = useColorScheme() === 'dark';

    const onLogOut = () => {
        Alert.alert(
            'Log Out',
            '정말로 로그아웃하시겠습니까?',
            [
                {
                    text: "No",
                    onPress: () => console.log("no"),
                    style: "destructive"
                },
                {
                    text: "Yes",
                    onPress: () => auth().signOut(),
                },
            ],
            {
                cancelable: true,
            },
        );
    };

    return(
        <Container>
            <LogoutButton onPress={onLogOut}>
                <LogoutButtonText isDark={isDark}> 로그아웃 </LogoutButtonText>
            </LogoutButton>
        </Container>
    )
};

const Container = styled.View``;

const LogoutButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 15px 0px;
`;

const LogoutButtonText = styled.Text`
    color: red;
    padding: 5px 5px;
    font-weight: 800;
`;


export default Setup;