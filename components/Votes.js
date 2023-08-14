import React from "react";
import styled from "styled-components";

const Votes = ({votes, isDark}) => {
    return (
        <VotesContainer isDark={isDark}> 
            {votes > 0 ? 
                `⭐️ ${votes} / 10` : 'Comming soon'} 
        </VotesContainer>
    )
};

const VotesContainer = styled.Text`
    color: ${(props) => (props.isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.6)")};
    font-size: 10px;
`;

export default Votes; 