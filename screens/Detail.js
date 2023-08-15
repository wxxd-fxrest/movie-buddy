import React, { useEffect } from "react";
import { Alert, StyleSheet, Text, useColorScheme } from "react-native";
import { useNavigation } from "@react-navigation/native";
import StarRating from 'react-native-star-rating-widget';
import { BlurView } from "expo-blur";
import firestore from '@react-native-firebase/firestore';
import Poster from "../components/Poster";
import { makeImgPath } from "../untils";
import styled from "styled-components";
import { darkTheme, lightTheme } from "../colors";
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Barcode from '../image/barcode-306926_1280.png';

const Detail = ({ navigation: {setOptions}, route: {params} }) => {
    const isDark = useColorScheme() === 'dark';
    const navigation = useNavigation();

    useEffect(() => {
        setOptions({
            title: params.Data.Calendar,
        }); 
    }, []); 

    const onDelete = () => {
        Alert.alert(
            '리뷰를 삭제하시겠습니까?',
            '삭제 시 복구할 수 없습니다.',
            [
                {
                    text: "No",
                    onPress: () => console.log("no"),
                    style: "destructive"
                },
                {
                    text: "Yes",
                    onPress: async() => {
                        await firestore()
                            .collection('Users').doc(`${params.Data.email}`)
                            .collection('MovieData').doc(`${params.Data.DateStandard}`)
                            .collection('Data').doc(`${params.DocID}`)
                            .delete().then(() => {
                            console.log('User deleted!');
                        });
                        navigation.goBack();
                    }
                },
            ],
            {
                cancelable: true,
            },
        );
    };

    return(
        <Container>
            <BgImg
                style={StyleSheet.absoluteFill}
                source={{ uri: makeImgPath(params.Data.BackImage) }}/>
            <BlurViewContainer
                tint={isDark ? "dark" : "light"}
                intensity={60} 
                style={StyleSheet.absoluteFill}>
                <Wrapper isDark={isDark}>
                    <Title isDark={isDark} numberOfLines={1}> 
                        {params.Data.MovieName.slice(0, 15)} 
                        {params.Data.MovieName.length > 10 ? "..." : null} 
                    </Title>
                    <MoreIcon onPress={onDelete}>
                        <AntDesign name="exclamationcircleo" size={20} color="black" />
                    </MoreIcon>
                    <Header>
                        <Poster path={params.Data.PosterImage} />
                        <ReviewContainer2 isDark={isDark}>
                            <ReviewBox>
                                <MaterialIcons name="rate-review" size={22} color={isDark ? "white" : "black"} />
                                <ReviewTitle isDark={isDark}> 리뷰 </ReviewTitle>
                            </ReviewBox>
                            <ReviewText isDark={isDark}> {params.Data.Review} </ReviewText>
                        </ReviewContainer2>
                    </Header>
                    <Column>
                        <VoteContainer>
                            <StyledStarRating
                                rating={params.Data.Vote}
                                color={isDark ? darkTheme.selectedDateColor : lightTheme.pointColor}                 
                                starSize={20}
                            />
                            <CalendarBox>
                                <MaterialCommunityIcons name="calendar-check" size={18} color={isDark ? "white" : "black"} />
                                <CalendarText isDark={isDark}> {params.Data.Calendar} </CalendarText>
                            </CalendarBox>
                        </VoteContainer>
                        {/* <ReviewContainer isDark={isDark}>
                            <ReviewTitle isDark={isDark}> 내가 남긴 리뷰 </ReviewTitle>
                            <ReviewText isDark={isDark}> {params.Data.Review} </ReviewText>
                        </ReviewContainer> */}
                        <BarcodeContainer>
                            <Text style={{color: 'grey'}}>  - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</Text>
                            <BarcodeImage isDark={isDark} source={Barcode} />
                            <BarcodeText isDark={isDark}> MovieBuddy </BarcodeText>
                        </BarcodeContainer>
                    </Column>
                </Wrapper>
            </BlurViewContainer>
        </Container>
    )
};

const Container = styled.View`
    background-color: lightgrey;
    flex: 1;
`;

const BgImg = styled.Image``;

const BlurViewContainer = styled(BlurView)`
    justify-content: center;
    align-items: center;
`;

const Wrapper = styled.View`
    background-color: ${(props) => (props.isDark ? "rgba(58, 73, 87, 0.9)" : "rgba(192, 193, 194, 0.9)")};
    flex-direction: row;
    width: 80%;
    height: 60%;
    /* justify-content: center; */
    align-items: center;
    margin-bottom: 100px;
    border-radius: 20px;
    flex-direction: column;
    padding: 20px 20px;
`;

const MoreIcon = styled.TouchableOpacity`
    position: absolute;
    top: 30px;
    right: 30px;
`;

const Title = styled.Text`
    /* background-color: yellowgreen; */
    color: ${(props) => (props.isDark ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)")};
    font-size: 18px;
    font-weight: 600;
    padding: 15px 0px;
`;

const Header = styled.View`
    flex-direction: row;
    margin-top: 10px;
`;

const Column = styled.View`
    /* background-color: yellowgreen; */
    /* width: 40%; */
    /* margin-left: 15px; */
    width: 100%;
    padding: 5% 0px;
`;

const VerticalStar = styled(FontAwesome)``;

const VoteContainer = styled.View`
    /* background-color: white; */
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    /* margin: 10px 0px; */
    padding: 15px 0px;
`;

const CalendarBox = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const CalendarText = styled.Text`
    color: ${(props) => (props.isDark ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)")};
    font-size: 12px;
`;

const StyledStarRating = styled(StarRating)``;

const ReviewContainer = styled.View`
    /* background-color: yellowgreen; */
    padding-bottom: 30px;
    border-bottom-color: ${(props) => (props.isDark ? darkTheme.pointColor : lightTheme.lightGreyColor)};
    border-bottom-width: 1;
    padding-top: 3%;
    height: 40%;
`;

const ReviewContainer2 = styled.View`
    color: ${(props) => (props.isDark ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)")};
    width: 60%;
    padding-left: 15px;
`;

const ReviewBox = styled.View`
    flex-direction: row;
    /* background-color: yellowgreen; */
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 5px;
`;

const ReviewTitle = styled.Text`
    color: ${(props) => (props.isDark ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)")};
    font-size: 13px;
    /* padding-bottom: 10px; */
`;

const ReviewText = styled.Text`
    color: ${(props) => (props.isDark ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)")};
    font-size: 12px;
`;

const BarcodeContainer = styled.View`
    align-items: center;
    height: 50%;
`;

const BarcodeImage = styled.Image`
    width: 80%;
    height: 60%;
    margin-top: 25px;
`;

const BarcodeText = styled.Text`
    color: ${(props) => (props.isDark ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)")};
    /* padding: 8px 0px; */
    font-size: 12px;
    padding-top: 10px;
`;

export default Detail;