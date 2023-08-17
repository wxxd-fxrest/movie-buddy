import React, { useState } from "react";
import { Dimensions, FlatList } from "react-native";
import styled from "styled-components";
import { darkTheme } from "../colors";
import { Feather } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import FullFilm from "./FullFilm";

const { width: SCREENWIDTH, height : SCREENHEIGHT } = Dimensions.get("window");

const FullFilmContainer = ({isDark, frilm, currentUser, setScrollHiden}) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [scroll, setScroll] = useState(40);

    const onScroll = (e) => {
        const {contentOffset} = e.nativeEvent;
        setScroll(contentOffset.y);

        if(scroll > 0) {
            setScrollHiden(true);
        } else if(scroll < 0) {
            setScrollHiden(false);
        }
    };

    return(
        <FilmBox>
            <FullFilmHeader>
                {isEnabled ? 
                    <FullFilmTitle>
                        <Feather name="list" size={28} color={isDark ? "lightgrey" : "black"} />
                    </FullFilmTitle> 
                :
                    <FullFilmTitle>
                        <MaterialCommunityIcons name="image-album" size={28} color={isDark ? "lightgrey" : "black"} />
                    </FullFilmTitle>
                }

                <SwitchButton isDark={isDark}
                    trackColor={{false: '#AFBED0', true: '#60748A'}}
                    thumbColor={isDark ? 
                        isEnabled ? 
                            darkTheme.selectedDateColor : darkTheme.headerColor 
                        : 
                        isEnabled ? 
                            "white" : "#ffb12b"}
                    ios_backgroundColor='#60748A'
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                /> 
            </FullFilmHeader>
            <FlatList data={frilm} 
                showsVerticalScrollIndicator={false} 
                ItemSeparatorComponent={heightEmpty}
                onScroll={onScroll}
                renderItem={({ item }) => (
                    <FullFilm ID={item} isDark={isDark} isEnabled={isEnabled} currentUser={currentUser}/>
                )}
            />
        </FilmBox>
    )
};

const FilmBox = styled.View`
    flex: ${SCREENHEIGHT <= "844" ? SCREENHEIGHT <= "667" ? "0.46" : "0.53" : "0.6"}; 
    padding: 0px 20px;
`;

const FullFilmHeader = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    padding: 10px 0px;
`;

const FullFilmTitle = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const SwitchButton = styled.Switch`
    margin-left: 5px;
`;

const heightEmpty = styled.View`
    height: 10px;
`;

export default FullFilmContainer;