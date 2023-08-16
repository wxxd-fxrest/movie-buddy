import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Poster from "../components/Poster";

const {width: SCREENWIDTH, height : SCREENHEIGHT} = Dimensions.get("window");

const ThisMonth = ({isDark, item}) => {
    const navigation = useNavigation();

    const goDetail = () => {
        navigation.navigate("Stack", {
            screen: "Detail",
            params: item,
        });
    };
    return(
        <MovieBox>
            <HeaderTitle> 
                <CommunityIcons name="movie-open-check-outline" size={15} isDark={isDark}/>
                <CalendarDate isDark={isDark}> {item.Data.Calendar.split('/')[1]}월 {item.Data.Calendar.split('/')[2]}일 </CalendarDate>
            </HeaderTitle>
            <TouchableOpacity onPress={goDetail}>
                <Poster path={item.Data.PosterImage} />
            </TouchableOpacity>
            <Title numberOfLines={1} isDark={isDark}> {item.Data.MovieName} </Title> 
        </MovieBox>
    )
};


const MovieBox = styled.View`
    flex-direction: column;
    justify-content: center;
`;

const HeaderTitle = styled.View`
    position: absolute;
    z-index: 3;
    top: 6px;
    right: 0;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
`;

const CommunityIcons = styled(MaterialCommunityIcons)`
    color: ${(props) => (props.isDark ? "white" : "black")};
`;

const CalendarDate = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "black")};
    font-size: ${SCREENHEIGHT <= "844" ? SCREENHEIGHT <= "667" ? "9px" : "9px" : "10px"}; 
`;

const Title = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "black")};
    position: absolute;
    bottom: 8px;
    font-size: 12px;
`;


export default ThisMonth;