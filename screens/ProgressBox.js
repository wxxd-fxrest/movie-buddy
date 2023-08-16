import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import * as Progress from 'react-native-progress'; 
import firestore from '@react-native-firebase/firestore';
import styled from "styled-components";
import { darkTheme, lightTheme } from "../colors";

const {width: SCREENWIDTH, height : SCREENHEIGHT} = Dimensions.get("window");

const ProgressBox = ({isDark, currentUser, movieLength}) => {
    const [targetInfo, setTargetInfo] = useState([]);
    const [dataTarget, setdataTarget] = useState(0);
    // console.log(movieLength)

    let timestamp = Date.now();
    let date = new Date(timestamp);
    let targetMonth = (
        (date.getFullYear()+ "년")+
        ('0' + (date.getMonth() + 1)).slice(-2)+ "월")

    // console.log(targetMonth)


    useEffect(() => {
        const subscriber = firestore().collection('Users').doc(`${currentUser.email}`)
            .collection('TargetData').doc(`${targetMonth}`).onSnapshot(documentSnapshot => {
                setTargetInfo(documentSnapshot.data());
                // console.log('User data: ', documentSnapshot.data());
                // console.log(targetInfo.target)
                if(targetInfo !== undefined) {
                    setdataTarget(targetInfo.target);
                }
                // console.log(dataTarget);
        });
  
        return () => subscriber();
    }, [currentUser, dataTarget]);

    return(
        <ProgressBarContainer isDark={isDark}>
            {dataTarget === undefined ? 
                <ProgressTitle isDark={isDark}> 목표를 설정해주세요. </ProgressTitle> : <>
                <ProgressTitle isDark={isDark}> 현재까지 진행상황을 확인하세요. </ProgressTitle>
                <ProgressContainer>
                    <TargetMinBox isDark={isDark}> {movieLength} </TargetMinBox>
                    <Progress.Bar
                        animated
                        progress={movieLength !== 0 ? 
                            movieLength/dataTarget
                            :
                            10/dataTarget
                        }
                        width={SCREENWIDTH/ 1.1}
                        height={20}
                        borderRadius={20}
                        color={isDark ? 
                            movieLength > dataTarget ? "#CC3D3D" : darkTheme.pointColor 
                            :
                            movieLength > dataTarget ? "#F15F5F" : lightTheme.pointColor}
                    />
                    <TargetMaxText isDark={isDark}> {dataTarget} </TargetMaxText>
                </ProgressContainer>
            </>}
        </ProgressBarContainer>
    )
};

const ProgressBarContainer = styled.View`
    width: 100%;
    background-color: ${(props) => (props.isDark ? "#191f24" : "lightgrey")};
    flex:  ${SCREENHEIGHT <= "667" ? "0.14" : "0.115"}; 
`;

const ProgressTitle = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "black")};
    margin-left: 20px;
    margin-top: 5px;
    padding: 8px 0px;
    font-size: 13px;
`;

const ProgressContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const TargetMinBox = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "black")};
    position: absolute;
    left: 27px;
    bottom: 3px;
    z-index: 3;
`;

const TargetMaxText = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "black")};
    position: absolute;
    right: 27px;
    bottom: 3px;
    z-index: 3;
`;

export default ProgressBox;