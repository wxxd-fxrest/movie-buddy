import React from "react";
import { Dimensions, LayoutAnimation } from "react-native";
import styled from "styled-components";
import { darkTheme, lightTheme } from "../colors";
import { Feather } from '@expo/vector-icons'; 
import ProfileIMG from '../image/large.png';

const {width: SCREENWIDTH, height : SCREENHEIGHT} = Dimensions.get("window");

const EditBefore = ({isDark, getUserData, getProfileData, setEdit, edit, basicName, setImageUrl2}) => {
    return (
        <ProfileContainer isDark={isDark}>

            <ProfileImage isDark={isDark} source={getProfileData ? {uri: getProfileData.profileImgURL} : ProfileIMG} />
            
            <Empty />

            <ProfileName isDark={isDark}> {getUserData ? getUserData.name : basicName} </ProfileName>

            <ProfileEdit isDark={isDark} onPress={() =>  {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                    setImageUrl2("");
                    setEdit(!edit);
                }}>
                <Feather name="edit-3" size={14} color={isDark ? "white" : "black"} />
                <ProfileEditText isDark={isDark}> 프로필 수정 </ProfileEditText>
            </ProfileEdit>

        </ProfileContainer> 
    )
};

const ProfileContainer = styled.View`
    flex-direction: row;
    align-items: center;
    padding-bottom: 15px;
    border-bottom-color: ${(props) => (props.isDark ? darkTheme.pointColor : lightTheme.lightGreyColor)};
    border-bottom-width: 1px;
    height: ${SCREENHEIGHT <= "667" ? SCREENHEIGHT / 7.5 : SCREENHEIGHT/ 7}px;
`;

const ProfileImage = styled.Image`
    width:  ${SCREENHEIGHT <= "667" ? "70px" : "90px"};
    height: ${SCREENHEIGHT <= "667" ? "70px" : "90px"};
    border-radius: 50px;
`;

const ProfileName = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "black")};
    padding: 10px 0px;
    font-size: 15px;
`;

const ProfileEdit = styled.TouchableOpacity`
    position: absolute;
    top: 0px;
    right: 0px;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 0px 8px;
    border-radius: 20px;
    border-width: 1px;
    border: solid 1px ${(props) => (props.isDark ? darkTheme.pointColor : lightTheme.lightGreyColor)};
`;

const ProfileEditText = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "black")};
    padding: 8px 0px;
    font-size: 10px;
    margin-left: 3px;
`;

const Empty = styled.View`
    width: 30px;
    height: 100%;
`;

export default EditBefore;