import React, { useEffect, useState } from "react";
import { Dimensions, FlatList } from "react-native";
import styled from "styled-components";
import firestore from '@react-native-firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons'; 
import TargetDetail from "./TargetDetail";

const {width: SCREENWIDTH, height : SCREENHEIGHT} = Dimensions.get("window");

const TargetList = ({isDark, currentUser}) => {
    const [targetInfo, setTargetInfo] = useState([]);

    useEffect(() => {
        const subscriber = firestore()
            .collection('Users').doc(`${currentUser.email}`)
            .collection('TargetData').orderBy('orderBy', 'desc').onSnapshot(documentSnapshot => {
                let feedArray = []
                documentSnapshot.forEach((doc) => {
                    feedArray.push({
                        DocID: doc.id,
                        DocData: doc.data(),
                    })
                });
                setTargetInfo(feedArray);
                // console.log(targetInfo[0].DocData.orderBy);
            });

        return () => subscriber();
    }, [currentUser]);

    return(
        <Container> 
            <ListHeader>
                <MaterialIcons name="playlist-add-check" isDark={isDark} size={26} color={isDark ? "white" : "black"}/>
                <Title isDark={isDark}> 목표 달성 </Title>
            </ListHeader>
            <FlatList 
                data={targetInfo} 
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.DocData.orderBy}
                renderItem={({item}) => (
                    <TargetDetail targetInfo={item} currentUser={currentUser} isDark={isDark}/>
                )} 
            />
        </Container>
    )
};

const Container = styled.View`
    height: ${SCREENHEIGHT / 2.2}px;
`;

const ListHeader = styled.View`
    flex-direction: row;
    justify-content: start;
    align-items: center;
`;

const Title = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "black")};
    padding: 10px 5px;
    font-size: 15px;
`;

export default TargetList;