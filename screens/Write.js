import React, { useState } from "react";
import { FlatList, useColorScheme } from "react-native";
import { useQuery } from "react-query";
import { movieApi } from "../api";
import styled from "styled-components";
import { darkTheme, lightTheme } from "../colors";
import VerticalList from "./VerticalList";
import Loader from "../components/Loader";

const Write = () => {
    const isDark = useColorScheme() === 'dark';
    const [query, setQuery] = useState("");

    const {
        isLoading: movieLoading, 
        data: movieData, 
        refetch: searchMovies
    } = useQuery(["searchMovies", query], 
        movieApi.search, {
            enabled: false,
    });

    const onChangeText = (text) => setQuery(text);

    const onSubmit = () => {
        if(query === "") {
            return; 
        }
        searchMovies();
    };

    const movieKeyExtractor = (item) => item.id + "";

    return (
        <Container>
            <Title isDark={isDark}> 영화를 선택하세요. </Title>
            <SearchInput isDark={isDark}
                placeholder="Search for Movie." 
                placeholderTextColor={isDark ? "lightgrey" : "grey"}
                returnKeyType="search"
                onChangeText={onChangeText}
                onSubmitEditing={onSubmit}
            /> 
            {movieLoading ? <Loader /> : null}
            {movieData ? 
            <FlatList data={movieData.results}
                ItemSeparatorComponent={horizontalEmpty}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                    <VerticalList 
                        isDark={isDark}
                        keyExtractor={movieKeyExtractor}
                        posterPath={item.poster_path}
                        originalTitle={item.original_title}
                        voteAverage={item.vote_average} 
                        overview={item.overview}
                        fullData={item}
                    />
                )}
            /> : null}
        </Container>
    )
};

const Container = styled.View`
    flex: 1;
    padding: 30px 30px;
`;

const Title = styled.Text`
    color:  ${(props) => (props.isDark ? "white" : "black")};;
`;

const SearchInput = styled.TextInput`
    border: solid 1px ${(props) => (props.isDark ? darkTheme.pointColor : lightTheme.pointColor)};
    padding: 10px 35px;
    border-radius: 15px;
    width: 100%;
    margin: 10px auto;
    margin-bottom: 40px;
    color: ${(props) => (props.isDark ? "white" : "black")};
`;

const horizontalEmpty = styled.View`
    height: 20px;
`;


export default Write;