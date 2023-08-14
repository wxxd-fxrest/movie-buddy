import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components"; 

const Loader = () => (
    <Wrapper>
        <ActivityIndicator /> 
    </Wrapper>
);

const Wrapper = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export default Loader;