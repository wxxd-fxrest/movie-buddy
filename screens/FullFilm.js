import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import firestore from '@react-native-firebase/firestore';
import styled from "styled-components";
import { darkTheme, lightTheme } from "../colors";
import { FontAwesome } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";
import Poster from "../components/Poster";

const FullFilm = ({ID, isEnabled, currentUser, isDark}) => {
    const [movieData, setMovieData] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const subscriber = firestore()
            .collection('Users').doc(currentUser.email)
            .collection('MovieData').doc(ID.DocID).collection('Data')
            .orderBy('Calendar', 'desc')
            .onSnapshot(documentSnapshot => {
                let feedArray = []
                documentSnapshot.forEach((doc) => {
                    feedArray.push({
                        DocID: doc.id, 
                        Data: doc.data(),
                    })
                    // console.log(doc.id, doc.data());
                });
                setMovieData(feedArray);
                // console.log(feedArray);
            });

        return () => subscriber();
    }, [currentUser]);

    return (
        <Container isDark={isDark}>
            <FilmTitle isDark={isDark}> {ID.DocID.split('년')[0]}년 {ID.DocID.split('년')[1]} </FilmTitle>
            {isEnabled === false &&
                <FlatList horizontal
                    data={movieData}
                    keyExtractor={(item) => item.DocID + ""}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={WidthEmpty}
                    renderItem={({item}) => (
                        <MovieBox onPress={() => {
                            navigation.navigate("Stack", {
                                screen: "Detail",
                                params: item,
                            });
                        }}>
                            <Poster path={item.Data.PosterImage} />
                            <Title numberOfLines={1} isDark={isDark}> {item.Data.MovieName} </Title>
                        </MovieBox>
                    )} 
                /> }
            {isEnabled === true &&
                <FlatList 
                    data={movieData}
                    keyExtractor={(item) => item.DocID + ""}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={horizontalEmpty}
                    renderItem={({item}) => (
                        <VerticalMovieBox>
                            <FontAwesome name="star" size={15} isDark={isDark} color={item.Data.Vote < 2.5 ? (isDark ? "white" : "black") : (isDark ? "yellow" : "red")}/>
                            <VerticalVote isDark={isDark}> {item.Data.Vote} </VerticalVote>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate("Stack", {
                                    screen: "Detail",
                                    params: item,
                                });
                            }}>
                                <VerticalTitle numberOfLines={1} isDark={isDark}> {item.Data.MovieName} </VerticalTitle>
                            </TouchableOpacity>
                        </VerticalMovieBox>
                    )} 
                />
            }
        </Container>
    )
};

const Container = styled.View`
    margin-bottom: 10px;
    flex-direction: column;
    justify-content: space-between;
`;


const FilmTitle = styled.Text`
    background-color: ${(props) => (props.isDark ? darkTheme.pointColor : lightTheme.pointColor)};
    color: ${(props) => (props.isDark ? "white" : "black")};
    margin-bottom: 10px;
    font-size: 12px;
    width: 80px;
`;

const MovieBox = styled.TouchableOpacity`
    flex-direction: column;
    justify-content: center;
    width: 100px;
`;

const VerticalMovieBox = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: start;
    margin-bottom: 10px;
`;

const Title = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "black")};
    font-size: 12px;
    margin-top: 5px;
`;

const VerticalTitle = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "black")};
    font-size: 15px;
    margin-top: 0px;
    background-color: ${(props) => (props.isDark ? darkTheme.pointColor : lightTheme.pointColor)};
`;

const VerticalVote = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "black")};
    width: 30px;
    margin-right: 10px;
`;

const WidthEmpty = styled.View`
    width: 20px;
`;

const horizontalEmpty = styled.View`
    height: 10px;
`;

export default FullFilm;