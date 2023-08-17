import React from "react";
import { ActivityIndicator, useColorScheme } from "react-native";
import styled from "styled-components";
import { darkTheme, lightTheme } from "../colors";
import ProfileIMG from '../image/effacda313633337cb8935be9d9486c2.jpg';

const ProfileEdit = ({ navigation: {setOptions}, route: {params} }) => {
    const isDark = useColorScheme() === 'dark';

    return(
        <Container>
            <ProfileImage isDark={isDark} source={ProfileIMG} />
            <ProfileNameInput isDark={isDark} 
                placeholder={params.name}
                placeholderTextColor={isDark ? "lightgrey" : "grey"}
                autoCapitalize="none"
                autoCorrect={false}
                maxLength={10}
                returnKeyType="done"
                // onSubmitEditing={onSubmitEmailEditing}
                onChangeText={(text) => setText(text)}
            /> 
            <Button isDark={isDark}>
                {loading ? <ActivityIndicator color="white"/> : 
                <ButtonText> 수정하기 </ButtonText>}
            </Button>

        </Container>
    )
};

const Container = styled.View`
    flex: 1; 
    padding: 30px 30px;
`;

const ProfileImage = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 50px;
    margin-right: 30px;
    border: solid 1px ${(props) => (props.isDark ? darkTheme.pointColor : lightTheme.lightGreyColor)};
`;

const ProfileNameInput = styled.TextInput`
    border: solid 1px ${(props) => (props.isDark ? darkTheme.pointColor : lightTheme.pointColor)};
    width: 100%;
    padding: 10px 20px;
    border-radius: 20px;
    font-size: 16px;
    color: ${(props) => (props.isDark ? "white" : "black")};
`;

const Button = styled.TouchableOpacity`
    width: 100%;
    padding: 10px 20px;
    border-width: 1px;
    border-radius: 20px;
    border-color: ${(props) => (props.isDark ? darkTheme.pointColor : lightTheme.pointColor)}; 
    justify-content: center;
    align-items: center;
    background-color: ${(props) => (props.isDark ? darkTheme.pointColor : lightTheme.pointColor)}; 
`;

const ButtonText = styled.Text`
    font-size: 16px;
    color: white;
`;

export default ProfileEdit;