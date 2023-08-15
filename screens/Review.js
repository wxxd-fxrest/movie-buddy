import React, { useEffect, useState } from "react";
import { Alert, useColorScheme } from "react-native";
import { useNavigation } from "@react-navigation/native";
import StarRating from 'react-native-star-rating-widget';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styled from "styled-components";
import { darkTheme, lightTheme } from "../colors";
import { Ionicons } from '@expo/vector-icons'; 
import DateContainer from "./DateContainer";

const Review = ({ navigation: {setOptions}, route: {params} }) => {
    const isDark = useColorScheme() === 'dark';
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(2.5);
    const [selected, setSelected] = useState('');
    const [currentUser, setCurrentUser] = useState({});
    const [targetInfo, setTargetInfo] = useState([]);

    const navigation = useNavigation();
    // console.log(selected.split('/')[0] + '/' + selected.split('/')[1])

    let timestamp = Date.now();
    let date = new Date(timestamp);
    let saveDate = (
        date.getFullYear()+ "년 "+
        (date.getMonth()+1)+ "월 " +
        date.getDate()+ "일 ");
    let targetMonth = (
        (date.getFullYear()+ "년")+
        ('0' + (date.getMonth() + 1)).slice(-2)+ "월");
    let previewDate = (
        (date.getFullYear()+ "/")+
        ('0' + (date.getMonth() + 1)).slice(-2));

        // console.log(previewDate)

    useEffect(() => {
        setOptions({
            title: "Review"
        }); 
    }, []); 

    useEffect(() => {
        setCurrentUser(auth().currentUser);
        // console.log("Review =>", currentUser)
    }, [currentUser]);

    useEffect(() => {
        const subscriber = firestore().collection('Users').doc(`${currentUser.email}`)
            .collection('TargetData').doc(`${targetMonth}`).onSnapshot(documentSnapshot => {
                setTargetInfo(documentSnapshot.data());
                // console.log('User data: ', documentSnapshot.data());
        });
  
        return () => subscriber();
    }, [currentUser]);

    const onSave = async() => {
        let getFullYear = selected.split('/')[0] + '년' + selected.split('/')[1] + '월'
        if(rating && review && selected) {
            await firestore().collection('Users').doc(`${currentUser.email}`)
                .collection('MovieData').doc(`${getFullYear}`).set({
                    start: getFullYear,
            })
            if((selected.split('/')[0] + '/' + selected.split('/')[1]) === previewDate) {
                await firestore().collection('Users').doc(`${currentUser.email}`)
                    .collection('TargetData').doc(`${targetMonth}`).update({
                        Preview: targetInfo.Preview + 1,
                })
            }
            await firestore().collection('Users').doc(`${currentUser.email}`)
                .collection('MovieData').doc(`${getFullYear}`)
                .collection('Data').add({
                    email: `${currentUser.email}`,
                    MovieName: `${params.original_title}`,
                    Overview: `${params.overview}`,
                    PosterImage: `${params.poster_path}`,
                    BackImage: `${params.backdrop_path}`,
                    Calendar: selected,
                    Vote: rating,
                    Review: review,
                    PostedDate: saveDate,
                    DateStandard: selected.split('/')[0] + '년' + selected.split('/')[1] + '월', 
            }).then(async () => {
                console.log('User added!');
            });
            goDate();
        } else {
            return Alert.alert("모든 항목을 체크해주세요."); 
        }
    };

    const goDate = () => {
        navigation.navigate("Tab", {
            screen: "Home"
        })
    }; 

    return(
        <Container>
            <HeaderBox>
                <DateContainer isDark={isDark} setSelected={setSelected} selected={selected}/>
                <VoteContainer>
                    <VoteText isDark={isDark}> {rating}/5 </VoteText>
                    <StyledStarRating
                        rating={rating}
                        onChange={setRating}
                        color={isDark ? darkTheme.pointColor : lightTheme.pointColor}                 
                        starSize={45}
                    />
                </VoteContainer>
            </HeaderBox>
            <InputContainer>
                <SearchInput isDark={isDark}
                    placeholder="Enter your review." 
                    placeholderTextColor={isDark ? "lightgrey" : "grey"}
                    returnKeyType="search"
                    maxLength={140}
                    multiline={true}
                    onChangeText={(text) => setReview(text)}
                /> 
                <SaveButton onPress={onSave}>
                    <Ionicons name="md-arrow-forward-circle-outline" size={35} 
                        color={isDark ? 
                            review ? 
                                darkTheme.selectedDateColor : darkTheme.pointColor 
                            : 
                            review ? 
                                "#F15F5F" : lightTheme.lightGreyColor}
                    />
                </SaveButton>
            </InputContainer>
        </Container>
    )
};

const Container = styled.View`
    flex-direction: column;
    flex: 1;
    padding: 20px;
`;

const HeaderBox = styled.View``;

const MovieTitle = styled.Text`
    font-size: 30px;
    color: ${(props) => (props.isDark ? "white" : "black")};
    font-weight: 600;
    padding: 10px 0px;
`;

const VoteContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0px;
`;

const VoteText = styled.Text`
    font-size: 30px;
    color: ${(props) => (props.isDark ? "white" : "black")};
    font-weight: 600;
`;

const StyledStarRating = styled(StarRating)``;

const InputContainer = styled.View`
    flex-direction: row;
    margin-top: 10px;
    border-top-color: ${(props) => (props.isDark ? darkTheme.pointColor : lightTheme.lightGreyColor)};
    border-top-width: 1;
`; 

const SearchInput = styled.TextInput`
    border-radius: 15px;
    width: 83%;
    margin: 20px auto;
    margin-bottom: 40px;
    color: ${(props) => (props.isDark ? "white" : "black")};
`;

const SaveButton = styled.TouchableOpacity`
    height: 40px;
    margin: 20px auto;
    justify-content: center;
    align-items: center;
`;

const SaveButtonText = styled.Text`
    font-size: 16px;
    color: white;
`;

export default Review;