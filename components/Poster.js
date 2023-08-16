import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { makeImgPath } from "../untils"; 

const { width: SCREENWIDTH, height : SCREENHEIGHT } = Dimensions.get("window");

const Image = styled.Image`
    width: ${SCREENHEIGHT <= "667" ? "80px" : "100px"};
    height: ${SCREENHEIGHT <= "667" ? "140px" : "160px"};
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.3);
`;

const Poster = ({ path }) => (
    <Image source={{ uri: makeImgPath(path) }} />
);

export default Poster;