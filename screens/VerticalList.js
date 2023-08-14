import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styled } from "styled-components";
import Poster from "../components/Poster";
import Votes from "../components/Votes";

const VerticalList = ({isDark, posterPath, originalTitle, voteAverage, overview, fullData}) => {
    const navigation = useNavigation();

    const goDate = () => {
        navigation.navigate("Stack", {
            screen: "Review",
            params: {
                ...fullData, 
            }
        })
    }; 

    return(
        <TouchableOpacity onPress={goDate}>
            <Movie>
                <Poster path={posterPath}/>
                <MovieList>
                    <Title isDark={isDark} numberOfLines={1}> 
                        {originalTitle}
                    </Title>
                    <Votes isDark={isDark} votes={voteAverage} />
                    <Overview isDark={isDark}> {overview.slice(0, 90)}... </Overview>
                </MovieList>
            </Movie>
        </TouchableOpacity>
    )
};

const Movie = styled.View`
    flex-direction: row;
`;

const MovieList = styled.View`
    flex-direction: column;
    margin-left: 25px;
    width: 80%;
`;

const Title = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "black")};
`;

const Overview = styled(Title)`
    color: ${(props) => (props.isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.6)")};
    margin-top: 5px;
    font-size: 14px;
    width: 80%;
`;

export default VerticalList;