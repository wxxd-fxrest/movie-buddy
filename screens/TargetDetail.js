import React, { useEffect, useState } from "react";
import * as Progress from 'react-native-progress';
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import styled from "styled-components";
import { darkTheme, lightTheme } from "../colors";
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const {width: SCREENWIDTH, height : SCREENHEIGHT} = Dimensions.get("window");

const TargetDetail = ({isDark, currentUser, targetInfo}) => {
    const navigation = useNavigation();
    const [targetData, setTargetData] = useState([]);
    const [month, setMonth] = useState('');

    useEffect(() => {
        const subscriber = firestore()
            .collection('Users').doc(`${currentUser.email}`)
            .collection('TargetData').doc(`${targetInfo.DocID}`)
            .onSnapshot(documentSnapshot => {
                setTargetData(documentSnapshot.data());
                setMonth(documentSnapshot.id);
                // console.log('User data: ', documentSnapshot.data());
        });
        
        return () => subscriber();
    }, [currentUser]);

    return(
        <Container>
            {targetData ? targetData.Preview <= 0 ? <>
                <Text isDark={isDark}> {month} </Text>
                <PreparingContainer isDark={isDark}>
                    <Preparing isDark={isDark}> 준비 중 입니다. </Preparing> 
                </PreparingContainer>
            </> : <ProgressBox onPress={() => {
                navigation.navigate("Stack", {
                    screen: "GoalAchieved",
                    params: {
                        month,
                        currentUser: `${currentUser.email}`, 
                    }
                });
            }}>
                    <ProgressHeader>
                        <MonthText isDark={isDark}> {month} </MonthText>
                        {targetData.Preview > targetData.target/1.4 ? 
                            <HappyIcon name="emoticon-kiss-outline" size={20} isDark={isDark} />
                            : 
                            <SadIcon name="sad-tear" size={20} isDark={isDark} />
                        }
                    </ProgressHeader>
                    <ProgressContainer>
                        <TargetMinBox isDark={isDark}> {targetData.Preview} </TargetMinBox>
                        <Progress.Bar
                            animated
                            progress={targetData.Preview >= 0 ? 
                                targetData.Preview/targetData.target
                                : 
                                10/10
                            }
                            width={SCREENWIDTH / 1.2}
                            height={23}
                            borderRadius={20}
                            color={isDark ? 
                                targetData.Preview > targetData.target/1.4 ? "#CC3D3D" : darkTheme.pointColor 
                                :
                                targetData.Preview > targetData.target/1.4 ? "#F15F5F" : lightTheme.pointColor}
                        /> 
                        <TargetMaxText isDark={isDark}> {targetData.target} </TargetMaxText>
                    </ProgressContainer>
                </ProgressBox>
            : null}
        </Container>
    )
};

const Container = styled.View``;

const Text = styled.Text`
    color: ${(props) => (props.isDark ? "grey" : "darkgrey")};
`;

const PreparingContainer = styled.View`
    padding: 5px 10px;
    border-radius: 20px;
    border: solid 1px  ${(props) => (props.isDark ? darkTheme.pointColor : lightTheme.pointColor)}; 
    margin-top: 10px;
    margin-bottom: 10px;
`;

const Preparing = styled.Text`
    color: ${(props) => (props.isDark ? "grey" : "darkgrey")};
`;

const ProgressBox = styled.TouchableOpacity`
    flex-direction: column;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const ProgressHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 0px 3px;
    align-items: center;
`;

const MonthText = styled.Text`
    background-color: ${(props) => (props.isDark ? darkTheme.pointColor : lightTheme.pointColor)};
    color: ${(props) => (props.isDark ? "white" : "black")};
`;

const HappyIcon = styled(MaterialCommunityIcons)`
    color: ${(props) => (props.isDark ? "white" : "black")};
`;

const SadIcon = styled(FontAwesome5)`
    color: ${(props) => (props.isDark ? "white" : "black")};
`;

const ProgressContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 5px 0px;
`;

const TargetMinBox = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "black")};
    position: absolute;
    left: 10px;
    bottom: 8px;
    z-index: 3;
`;

const TargetMaxText = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "black")};
    position: absolute;
    right: 10px;
    bottom: 8px;
    z-index: 3;
`;

export default TargetDetail;