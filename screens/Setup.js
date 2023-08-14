import React from "react";
import { Alert } from "react-native"; 
import styled from "styled-components";
import auth from '@react-native-firebase/auth';

const Setup = () => {
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
            <Text> 설정 </Text>
            <LogoutButton onPress={onLogOut}>
                <LogoutButtonText> Logout </LogoutButtonText>
            </LogoutButton>
        </Container>
    )
};

const Container = styled.View``;

const Text = styled.Text``;


const LogoutButton = styled.TouchableOpacity`
    background-color: grey;
`;

const LogoutButtonText = styled.Text`
    color: "red"
`;


export default Setup;