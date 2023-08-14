import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import styled from "styled-components";
import firestore from '@react-native-firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons'; 
import TargetDetail from "./TargetDetail";

const TargetList = ({isDark, currentUser}) => {
    const [targetInfo, setTargetInfo] = useState([]);
    // const [movieData, setMovieData] = useState([]);

    let timestamp = Date.now();
    let date = new Date(timestamp);
    let targetMonth = (
        (date.getFullYear()+ "년")+
        ('0' + (date.getMonth() + 1)).slice(-2)+ "월")
        
        // console.log(targetMonth);

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
                // console.log(targetInfo);
            });

        return () => subscriber();
    }, [currentUser]);

// 두가지 데이터 배열 렌더링(비교) 하려면 맵과 플라리스트를 같이 써야할 것 같음 
    return(
        <Container> 
            <ListHeader>
                <MaterialIcons name="playlist-add-check" isDark={isDark} size={26} color={isDark ? "white" : "black"}/>
                <Title isDark={isDark}> 목표 달성 </Title>
            </ListHeader>
            <FlatList 
                data={targetInfo} 
                showsHorizontalScrollIndicator={false}
                // ItemSeparatorComponent={WidthEmpty}
                renderItem={({item}) => (
                    <TargetDetail targetInfo={item} currentUser={currentUser} isDark={isDark}/>
                )} 
            />
                {/* {targetInfo.map((t, i) => (
                ))} */}
        </Container>
    )
};

const Container = styled.View`
    /* background-color: yellowgreen; */
    /* margin-top: 10px; */
    /* height: 65%; */
`;

const ListHeader = styled.View`
    flex-direction: row;
    justify-content: start;
    align-items: center;
    margin-bottom: 5px;
`;

const Title = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "black")};
    padding: 10px 5px;
    font-size: 15px;
`;

export default TargetList;