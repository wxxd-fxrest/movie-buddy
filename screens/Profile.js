import React, { useEffect, useState } from "react";
import { Dimensions, useColorScheme } from "react-native";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styled from "styled-components";
import ProfileBox from "./ProfileBox";
import Target from "./Target";
import TargetList from "./TargetList";
import AddButton from "../components/AddButton";

const {width: SCREENWIDTH, height : SCREENHEIGHT} = Dimensions.get("window");

const Profile = ({ navigation: {setOptions} }) => {
    const isDark = useColorScheme() === 'dark';
    const [currentUser, setCurrentUser] = useState({});
    const [getUserData, setGetUserData] = useState([]);
    const [getProfileData, setGetProfileData] = useState([]);

    useEffect(() => {
        setOptions({
            title: getUserData ? getUserData.name: "프로필",
        }); 
    }, [getUserData.name]); 

    useEffect(() => {
        setCurrentUser(auth().currentUser);
    }, [currentUser]);

    useEffect(() => {
        const subscriber = firestore().collection('Users').doc(`${currentUser.email}`)
            .onSnapshot(documentSnapshot => {
                setGetUserData(documentSnapshot.data());
                // console.log('User data: ', documentSnapshot.data());
        });

        const subscriber2 = firestore().collection('Users').doc(`${currentUser.email}`).collection('UsersData').doc('URL')
            .onSnapshot(documentSnapshot => {
                setGetProfileData(documentSnapshot.data());
                // console.log('User data: ', documentSnapshot.data());
        });
  
        return () => {
            subscriber();
            subscriber2();
        }
    }, [currentUser]);

    return (
        <Container>
            <ProfileBox isDark={isDark} currentUser={currentUser} getUserData={getUserData} getProfileData={getProfileData}/>
            <Target isDark={isDark} currentUser={currentUser}/>
            <TargetList isDark={isDark} currentUser={currentUser}/>
            <AddButton />
        </Container>
    )
};

const Container = styled.View`
    flex: 1; 
    padding: 30px 30px;
    height: ${SCREENHEIGHT}px;
`;

export default Profile; 