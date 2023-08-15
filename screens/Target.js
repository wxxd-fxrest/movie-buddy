import React, { useEffect, useState } from "react";
import { Alert, LayoutAnimation } from "react-native";
import firestore from '@react-native-firebase/firestore';
import styled from "styled-components";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { darkTheme, lightTheme } from "../colors";

const Target = ({isDark, currentUser}) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [target, setTarget] = useState(0);
    const [targetInfo, setTargetInfo] = useState([]);

    let timestamp = Date.now();
    let date = new Date(timestamp);
    let targetMonth = (
        (date.getFullYear()+ "년")+
        ('0' + (date.getMonth() + 1)).slice(-2)+ "월");

    useEffect(() => {
        const subscriber = firestore().collection('Users').doc(`${currentUser.email}`)
            .collection('TargetData').doc(`${targetMonth}`).onSnapshot(documentSnapshot => {
                setTargetInfo(documentSnapshot.data());
                // console.log('User data: ', documentSnapshot.data());
                // console.log(targetInfo)
        });
    
        return () => subscriber();
    }, [currentUser]);

    const onVisible = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        setModalVisible(!isModalVisible);
    };

    const onSubmitTargetEditing = async() => {
        if(target) {
            if(!targetInfo) {
                await firestore().collection('Users').doc(`${currentUser.email}`)
                    .collection('TargetData').doc(`${targetMonth}`).set({
                    target: target,
                    limit: 3,
                    Preview: 0,
                    orderBy: targetMonth, 
                })
            } else if(targetInfo.limit) {
                Alert.alert(
                    '남은 횟수:' + `${targetInfo.limit}`,
                    '정말로 변경하시겠습니까?',
                    [
                        {
                            text: "No",
                            onPress: () => console.log("no"),
                            style: "destructive"
                        },
                        {
                            text: "Yes",
                            onPress: async() => {
                                await firestore().collection('Users').doc(`${currentUser.email}`)
                                    .collection('TargetData').doc(`${targetMonth}`).update({
                                    target: target,
                                    limit: targetInfo.limit - 1,
                                })
                                if(targetInfo.limit === 2) {
                                    Alert.alert("앞으로 한 번"); 
                                } else if(targetInfo.limit === 1) {
                                    Alert.alert("더이상 변경할 수 없습니다."); 
                                }
                            }
                        },
                    ],
                    {
                        cancelable: true,
                    },
                );
            }   
        } else {
            return Alert.alert("목표를 설정해주세요."); 
        }
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        setModalVisible(!isModalVisible);
    };

    return(
        <TargetContainer isDark={isDark}>
            <TargetGuideContainer isDark={isDark}>
                <LimitBox>
                    <LimitText isDark={isDark}> 이번 달 목표: </LimitText>
                    <Limit isDark={isDark}> {targetInfo ? targetInfo.target : 0} </Limit>
                </LimitBox>
                <TargetNumberBox>
                    <TargetNumberText isDark={isDark}> 변경횟수: </TargetNumberText>
                    <TargetNumber isDark={isDark}> {targetInfo ? targetInfo.limit : 3} </TargetNumber>
                </TargetNumberBox>
            </TargetGuideContainer>
            <TargetChange>
            {targetInfo.limit === 0 ? <>
                <Title isDark={isDark}> 목표 변경횟수를 초과하였습니다. </Title>
                <PlusButton>
                    <AntDesign name="exclamationcircleo" size={30} 
                        color={isDark ? 
                            isModalVisible ? 
                                darkTheme.selectedDateColor : darkTheme.pointColor 
                            : 
                            isModalVisible ? 
                                "#F15F5F" : lightTheme.lightGreyColor}
                    />
                </PlusButton>
            </> : <>
                {!isModalVisible && 
                    <Title isDark={isDark}> 이번 달 목표를 설정해주세요. </Title>}
                    <PlusButton onPress={onVisible}>
                        <MaterialCommunityIcons name="progress-star" size={30} 
                            color={isDark ? 
                                isModalVisible ? 
                                    darkTheme.selectedDateColor : darkTheme.pointColor 
                                : 
                                isModalVisible ? 
                                    "#F15F5F" : lightTheme.lightGreyColor 
                        }/>
                    </PlusButton>
                    {isModalVisible ? <>
                        <TargetInput 
                            isDark={isDark}
                            placeholder={target ? target : "TargetSetup"}
                            placeholderTextColor={isDark ? "lightgrey" : "grey"}
                            autoCapitalize="none"
                            autoCorrect={false}
                            maxLength={2}
                            returnKeyType="done"
                            keyboardType="number-pad"
                            onSubmitEditing={onSubmitTargetEditing}
                            onChangeText={(text) => setTarget(text)}
                        /> 
                        <TargetButton onPress={onSubmitTargetEditing}>
                            <Ionicons name="md-arrow-forward-circle-outline" size={30} 
                                color={isDark ? 
                                    isModalVisible ? 
                                        darkTheme.selectedDateColor : darkTheme.pointColor 
                                    : 
                                    isModalVisible ? 
                                        "#F15F5F" : lightTheme.lightGreyColor}
                            /> 
                        </TargetButton>

                    </> : null}
                </>}
            </TargetChange>
        </TargetContainer>
    )
};

const TargetContainer = styled.View`
    width: 100%;
    margin-top: 10px;
    padding-bottom: 10px;
    border-bottom-color: ${(props) => (props.isDark ? darkTheme.pointColor : lightTheme.lightGreyColor)};
    border-bottom-width: 1;
`;

const TargetGuideContainer = styled.View`
    background-color: ${(props) => (props.isDark ? "#191f24" : "lightgrey")};
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 10px;
`;

const LimitBox = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const LimitText = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "black")};
    font-size: 14px;
    margin-right: 5px;
`;

const Limit = styled(LimitText)`
    background-color: ${(props) => (props.isDark ? darkTheme.pointColor : lightTheme.pointColor)};
`;

const TargetNumberBox = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const TargetNumberText = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "black")};
    font-size: 14px;
    margin-right: 5px;
`;

const TargetNumber = styled(TargetNumberText)`
    background-color: ${(props) => (props.isDark ? darkTheme.pointColor : lightTheme.pointColor)};
`;


const TargetChange = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "black")};
    padding: 15px 0px;
    font-size: 15px;
`;

const PlusButton = styled.TouchableOpacity`
    margin-right: 10px;
`;

const TargetInput = styled.TextInput`
    border: solid 1px ${(props) => (props.isDark ? darkTheme.pointColor : lightTheme.pointColor)};
    width: 85%;
    padding: 10px 20px;
    border-radius: 20px;
    font-size: 16px;
    color: ${(props) => (props.isDark ? "white" : "black")};
`;

const TargetButton = styled.TouchableOpacity`
    position: absolute;
    right: 5px;
`;

export default Target; 