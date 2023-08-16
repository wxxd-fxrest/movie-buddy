import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Dimensions, LayoutAnimation } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import styled from "styled-components";
import { darkTheme, lightTheme } from "../colors";
import ProfileIMG from '../image/effacda313633337cb8935be9d9486c2.jpg';
import { Feather } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';  
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import EditBefore from "./EditBefore";

const {width: SCREENWIDTH, height : SCREENHEIGHT} = Dimensions.get("window");

const ProfileBox = ({isDark, currentUser, getUserData, getProfileData}) => {
    const [basicName, setBasicName] = useState("");
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [imageUrl2, setImageUrl2] = useState('');
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

    useEffect(() => {
        if(currentUser.email) {
            setBasicName(currentUser.email.split('@')[0]);
        }
    }, [currentUser]);

    const uploadImage = async() => {
        setImageUrl2('');
        if(!status?.granted) {
            const permission = await requestPermission();
            if(!permission.granted) {
                return null;
            }
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false, 
            quality: 1,
            aspect: [1, 1],
        });

        // console.log(result);
        setImageUrl(result);
        setLoading(true);

        try {
            let IMG_URL;
            if (imageUrl !== '') {
                const asset = imageUrl.assets[0];
                const reference = storage().ref(`/profile/${asset.fileName}`); // 업로드할 경로 지정
                    await reference.putFile(asset.uri);
                    IMG_URL = imageUrl ? await reference.getDownloadURL() : null;
            }
            setImageUrl2(IMG_URL);
            // console.log("IMG_URL", IMG_URL);
            setLoading(false); 
            if(IMG_URL === undefined) {
                Alert.alert("이미지를 다시 선택해주세요.");
            }
        } catch(e) {
            console.log(e);
        }; 
    };


    const onImgEdit = async() => {
        if(imageUrl2) {
            await firestore().collection('Users').doc(`${currentUser.email}`)
                .collection('UsersData').doc('URL').set({
                profileImgURL: imageUrl2,
            });
        }
        setEdit(!edit);
    };

    const onEdit = async() => {
        if(text) {
            await firestore().collection('Users').doc(`${currentUser.email}`).set({
                email: `${currentUser.email}`,
                name: text ? text : getUserData.name,
            });
        }
        setEdit(!edit);
    };
    
    return(
        <>
            {!edit ? 
                <EditBefore isDark={isDark} getProfileData={getProfileData} getUserData={getUserData} setEdit={setEdit} edit={edit} basicName={basicName} setImageUrl2={setImageUrl2}/>
                : 
                <ProfileContainer isDark={isDark}>

                    <EditBackContainer onPress={() => {
                            LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                            setEdit(!edit);
                        }}>
                        <AntDesign name="exclamation" size={14} color={isDark ? "white" : "black"} />
                        <ProfileEditText isDark={isDark}> 수정 취소 </ProfileEditText>
                    </EditBackContainer>

                    <EditImageBox onPress={uploadImage}>
                        <EditImage isDark={isDark} source={imageUrl2 ? {uri: imageUrl2} : getProfileData ? {uri: getProfileData.Url} : ProfileIMG} />
                        <EditImageIcons isDark={isDark} name="image-search-outline" size={40}/>
                    </EditImageBox>

                    <Empty />

                    <ProfileNameInput isDark={isDark} 
                        placeholder= {getUserData ? getUserData.name : text ? text : basicName}
                        placeholderTextColor={isDark ? "lightgrey" : "grey"}
                        autoCapitalize="none"
                        autoCorrect={false}
                        maxLength={10}
                        returnKeyType="done"
                        onChangeText={(text) => setText(text)}
                    /> 

                    {imageUrl2 ? 
                        <ProfileEdit isDark={isDark} onPress={onImgEdit}>
                            <Feather name="edit-3" size={14}  color={isDark ? "white" : "black"} />
                            {loading === true ? 
                                <ActivityIndicator isDark={isDark} color={isDark ? "white" : "black"}/> 
                                :                        
                                <ProfileEditText isDark={isDark}> 이미지 수정 완료 </ProfileEditText>
                            } 
                        </ProfileEdit>
                        :
                        <ProfileEdit isDark={isDark} onPress={onEdit}>
                            <Feather name="edit-3" size={14}  color={isDark ? "white" : "black"} />
                            {loading === true ? 
                                <ActivityIndicator isDark={isDark} color={isDark ? "white" : "black"}/> 
                                :                        
                                <ProfileEditText isDark={isDark}> 수정 완료 </ProfileEditText>
                            } 
                        </ProfileEdit>
                    }
                </ProfileContainer>
            }
        </>
    )
};


const Imagee = styled.Image`
    width: 100px;
    height: 100px;
`;

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

const ProfileNameInput = styled.TextInput`
    border-bottom-color: ${(props) => (props.isDark ? darkTheme.pointColor : lightTheme.lightGreyColor)};
    border-bottom-width: 1px;
    width: 30%;
    padding: 10px 3px;
    font-size: 16px;
    color: ${(props) => (props.isDark ? "white" : "black")};
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

const EditBackContainer = styled.TouchableOpacity`
    position: absolute;
    bottom: 10px;
    right: 0px;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 0px 8px;
    border-radius: 20px;
    border-width: 1px;
    border: solid 1px ${(props) => (props.isDark ? darkTheme.pointColor : lightTheme.lightGreyColor)};
`;

const EditImageBox = styled.TouchableOpacity``;

const EditImage = styled(ProfileImage)`
    opacity: 0.5;
`;

const EditImageIcons = styled(MaterialCommunityIcons)`
    position: absolute;
    top: ${SCREENHEIGHT <= "667" ? "15px" : "25px"}; 
    right: ${SCREENHEIGHT <= "667" ? "15px" : "25px"}; 
    color: ${(props) => (props.isDark ? "white" : "black")};
    box-shadow: ${(props) => (props.isDark ? "1px 1px 5px rgba(255, 255, 255, 0.3)" : "1px 1px 5px rgba(0, 0, 0, 0.3)")};
`;

const Empty = styled.View`
    width: 30px;
    height: 100%;
`;

export default ProfileBox;