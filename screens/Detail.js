import React from "react";
import { StyleSheet, useColorScheme } from "react-native";
import StarRating from 'react-native-star-rating-widget';
import { BlurView } from "expo-blur";
import Poster from "../components/Poster";
import { makeImgPath } from "../untils";
import styled from "styled-components";
import { darkTheme, lightTheme } from "../colors";
import { FontAwesome } from '@expo/vector-icons'; 
import Barcode from '../image/barcode-306926_1280.png';

const Detail = ({ navigation: {setOptions}, route: {params} }) => {
    const isDark = useColorScheme() === 'dark';

    // console.log(params)
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
                        {params.Data.MovieName.slice(0, 80)} 
                        {params.Data.MovieName.length > 13 ? "..." : null} 
                    </Title>
                    <Header>
                        <Poster path={params.Data.PosterImage} />
                        <OverviewText> 
                            {params.Data.Overview !== "" && params.Data.Overview.length > 80 ? 
                                `${params.Data.Overview.slice(0, 230)}...` : params.Data.Overview} 
                        </OverviewText>
                    </Header>
                    <Column>
                        <VoteContainer>
                            <StyledStarRating
                                rating={params.Data.Vote}
                                // onChange={setRating}
                                color={isDark ? darkTheme.pointColor : lightTheme.pointColor}                 
                                starSize={20}
                            />
                            <CalendarText isDark={isDark}> {params.Data.Calendar} </CalendarText>
                        </VoteContainer>
                        <ReviewContainer isDark={isDark}>
                            <ReviewTitle isDark={isDark}> 내가 남긴 리뷰 </ReviewTitle>
                            <ReviewText isDark={isDark}> {params.Data.Review} </ReviewText>
                        </ReviewContainer>
                        <BarcodeContainer>
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
    height: 80%;
    /* justify-content: center; */
    align-items: center;
    margin-bottom: 100px;
    border-radius: 20px;
    flex-direction: column;
    padding: 20px 20px;
`;

const Title = styled.Text`
    color: ${(props) => (props.isDark ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)")};
    font-size: 18px;
    font-weight: 600;
    padding: 10px 0px;
`;

const Header = styled.View`
    flex-direction: row;
`;


const OverviewText = styled.Text`
    /* background-color: yellow; */
    color: ${(props) => (props.isDark ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)")};
    width: 60%;
    margin-left: 10px;
    font-size: 13px;
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
`;

const CalendarText = styled.Text`
    color: ${(props) => (props.isDark ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)")};
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

const ReviewTitle = styled.Text`
    color: ${(props) => (props.isDark ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)")};
    padding: 10px 0px;
`;

const ReviewText = styled.Text`
    color: ${(props) => (props.isDark ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)")};
    font-size: 14px;
`;

const BarcodeContainer = styled.View`
    /* background-color: yellowgreen; */
    align-items: center;
`;

const BarcodeImage = styled.Image`
    width: 100%;
    height: 40%;
    margin-top: 15px;
`;

const BarcodeText = styled.Text`
    color: ${(props) => (props.isDark ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)")};
    padding: 8px 0px;
`;

export default Detail;