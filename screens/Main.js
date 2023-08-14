import React, { useEffect, useState } from "react";
import { FlatList, useColorScheme } from "react-native";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styled from "styled-components";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import LogoImage from '../image/large.png';
import AddButton from "../components/AddButton";
import ThisMonth from "./ThisMonth";
import ProgressBox from "./ProgressBox";
import FullFilmContainer from "./FullFilmContainer";

const Main = ({navigation, route: {params} }) => {
    const isDark = useColorScheme() === 'dark';
    // const navigation = useNavigation();
    const [currentUser, setCurrentUser] = useState({});
    const [movieData, setMovieData] = useState([]);
    const [frilm, setFilm] = useState([]);
    const [scrollHiden, setScrollHiden] = useState(false);

    // console.log("params", params);

    let timestamp = Date.now()
    let date = new Date(timestamp);
    const addZero = (date) => {
        if (date < 10) {
          const zeroDate = ('00' + date).slice(-2);
          return zeroDate;
        }
        return date;
    }
    let saveDate = (
        date.getFullYear()+ "년" + 
        addZero(date.getMonth()+1)+ "월"
    )

    useEffect(() => {
        setCurrentUser(auth().currentUser);
    }, [currentUser]);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () =>(<ImageM source={LogoImage}/>)
        });
    }, [navigation]);

    useEffect(() => {
        const subscriber = firestore()
            .collection('Users').doc(currentUser.email)
            .collection('MovieData').doc(saveDate)
            .collection('Data').orderBy('Calendar', 'desc').onSnapshot(documentSnapshot => {
                let feedArray = []
                documentSnapshot.forEach((doc) => {
                    feedArray.push({
                        DocID: doc.id, 
                        Data: doc.data(),
                    })
                });
                setMovieData(feedArray);
                // console.log(feedArray.length);
            });

        return () => subscriber();
    }, [currentUser]);

    useEffect(() => {
        const subscriber = firestore()
            .collection('Users').doc(currentUser.email)
            .collection('MovieData').orderBy('start', 'desc').onSnapshot(documentSnapshot => {
                let feedArray = []
                documentSnapshot.forEach((doc) => {
                    feedArray.push({
                        DocID: doc.id, 
                    })
                });
                setFilm(feedArray);
                // console.log(frilm);
            });

        return () => subscriber();
    }, [currentUser]);


    return (
        <Container>
            <MovieContainer>
                <TitleBox>
                    <MaterialCommunityIcons name="film" size={18} color={isDark ? "lightgrey" : "black"} />
                    <ThisMonthTitle isDark={isDark}> 이 달의 영화 </ThisMonthTitle>
                </TitleBox>
                <FlatList horizontal
                    data={movieData} 
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={WidthEmpty}
                    renderItem={({item}) => (
                        <ThisMonth isDark={isDark} item={item}/>
                    )} 
                />
            </MovieContainer>
            
            <ProgressBox scrollHiden={scrollHiden} isDark={isDark} currentUser={currentUser} movieLength={movieData.length} /> 
           
            <FullFilmContainer isDark={isDark} frilm={frilm} currentUser={currentUser} 
                scrollHiden={scrollHiden} setScrollHiden={setScrollHiden} />
            
            {scrollHiden === false ? <AddButton /> : null}
            
        </Container>
    )
};

const Container = styled.View`
    flex: 1; 
    padding-top: 10px;
`;

const ImageM = styled.Image`
    width: 50px;
    height: 40px;
`;

const MovieContainer = styled.View`
    width: 100%;
    flex-direction: column;
    /* height: 240px; */
    padding: 0px 20px;
    flex: 0.33;
`;

const TitleBox = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const ThisMonthTitle = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "black")};
`;

const WidthEmpty = styled.View`
    width: 20px;
`;

export default Main; 