import React, { useEffect, useState } from "react";
import { FlatList, useColorScheme } from "react-native";
import { useNavigation } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import styled from "styled-components";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Poster from "../components/Poster";
import { darkTheme, lightTheme } from "../colors";

const GoalAchieved = ({ navigation: {setOptions}, route: {params} }) => {
    const [goalAchieved, setGoalAchieved] = useState([]);
    const isDark = useColorScheme() === 'dark';
    const navigation = useNavigation();

    useEffect(() => {
        setOptions({
            title: params.month,
        }); 
    }, []); 

    useEffect(() => {
        const subscriber = firestore()
            .collection('Users').doc(`${params.currentUser}`)
            .collection('MovieData').doc(`${params.month}`)
            .collection('Data').orderBy('Calendar', 'asc').onSnapshot(documentSnapshot => {
                let feedArray = []
                documentSnapshot.forEach((doc) => {
                    feedArray.push({
                        DocID: doc.id,
                        Data: doc.data(),
                    })
                });
                setGoalAchieved(feedArray);
                // console.log(targetInfo[0].Data.orderBy);
            });

        return () => subscriber();
    }, [params.currentUser]);

    return(
        <Container>
            <FlatList 
                data={goalAchieved}
                keyExtractor={(item) => item.DocID + ""}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={HeightEmpty}
                renderItem={({item}) => (
                    <MovieBox onPress={() => {
                        navigation.navigate("Stack", {
                            screen: "Detail",
                            params: item,
                        });
                    }}>
                        <Poster path={item.Data.PosterImage} />
                        <WidthEmpty />
                        <RightContainer>
                            <HeaderTitle> 
                                <CommunityIcons name="movie-open-check-outline" size={15} isDark={isDark}/>
                                <CalendarDate isDark={isDark}> {item.Data.Calendar.split('/')[1]}월 {item.Data.Calendar.split('/')[2]}일 </CalendarDate>
                            </HeaderTitle>

                            <TitleBox>
                                <Title numberOfLines={1} isDark={isDark}>{item.Data.MovieName}</Title>
                            </TitleBox>
                            <ReviewText isDark={isDark}> 
                                {item.Data.Review !== "" && item.Data.Review.length > 80 ? 
                                    `${item.Data.Review.slice(0, 230)}...` : item.Data.Review} 
                            </ReviewText>
                        </RightContainer>
                    </MovieBox>
                )} 
            /> 
        </Container>
    )
};

const Container = styled.View`
    flex: 1;
    padding: 30px 30px;
`;

const MovieBox = styled.TouchableOpacity`
    flex-direction: row;
`;

const RightContainer = styled.View`
    flex-direction: column;
    width: 65%;
`;

const HeaderTitle = styled.View`
    flex-direction: row;
    align-items: flex-end;
`;

const CommunityIcons = styled(MaterialCommunityIcons)`
    color: ${(props) => (props.isDark ? "white" : "black")};
`;

const CalendarDate = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "black")};
    font-size: 10px;
`;

const TitleBox = styled.View`
    align-items: flex-start;
    justify-content: center;
`;

const Title = styled.Text`
    background-color: ${(props) => (props.isDark ? darkTheme.pointColor : lightTheme.pointColor)};
    color: ${(props) => (props.isDark ? "white" : "black")};
    font-size: 14px;
    margin: 5px 0px;
`;

const ReviewText = styled.Text`
    color: ${(props) => (props.isDark ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)")};
    font-size: 12px;
`;

const HeightEmpty = styled.View`
    height: 20px;
`;

const WidthEmpty = styled.View`
    width: 20px;
`; 

export default GoalAchieved;