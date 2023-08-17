import React, { useEffect, useState } from "react"; 
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons"

const AddButton = () => {
    const navigation = useNavigation();
    const [currentUser, setCurrentUser] = useState({});
    const [targetInfo, setTargetInfo] = useState([]);

    let timestamp = Date.now();
    let date = new Date(timestamp);
    let targetMonth = (
        (date.getFullYear()+ "년")+
        ('0' + (date.getMonth() + 1)).slice(-2)+ "월");

    const goDetail = () => {
        if(targetInfo.target === undefined) {
            Alert.alert("이 달 목표를 먼저 설정해주세요.");
        } else {
            navigation.navigate("Stack", {screen: "Write"});
        }
    };

    useEffect(() => {
        setCurrentUser(auth().currentUser);
    }, [currentUser]);

    useEffect(() => {
        const subscriber = firestore().collection('Users').doc(`${currentUser.email}`)
            .collection('TargetData').doc(`${targetMonth}`).onSnapshot(documentSnapshot => {
                setTargetInfo(documentSnapshot.data());
                // console.log('User data: ', documentSnapshot.data());
        });
  
        return () => subscriber();
    }, [currentUser]);

    return (
        <Button onPress={goDetail}>
            <Ionicons name="add" size={36} color="white" />
        </Button>
    )
};

const Button = styled.TouchableOpacity`
    background-color: ${(props) => (props.isDark ? "white" : props.theme.pointColor)};
    position: absolute;
    bottom: 20px;
    right: 30px;
    height: 60px;
    width: 60px;
    border-radius: 40px;
    justify-content: center;
    align-items: center;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
`;

export default AddButton; 