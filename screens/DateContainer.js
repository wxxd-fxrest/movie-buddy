import React from "react";
import { Button } from "react-native";
import DatePicker from 'react-native-date-ranges';
import { Feather } from "@expo/vector-icons";
import styled from "styled-components";
import { darkTheme, lightTheme } from "../colors";

const DateContainer = ({isDark, selected, setSelected}) => {
    const datePick = (day) => {
        setSelected(day.currentDate);
    };

    const customButton = (onConfirm) => {
        return (
            <Button onPress={onConfirm}
                style={{
                    container: {
                        width: "80%",
                        marginHorizontal: "3%",
                    },
                    text: {fontSize: 20}
                }}
                primary
                title="Submit"
            />
        )
    };

    return(
        <CalendarBox>
            <Feather name="calendar" size={40} 
                color={isDark ? darkTheme.pointColor : lightTheme.pointColor} />
            <DatePicker isDark={isDark}
                style={{ 
                    width: "85%", 
                    height: 45, 
                    borderColor: isDark ? darkTheme.pointColor : lightTheme.pointColor
                }} 
                customStyles = {{
                    placeholderText:{ 
                        fontSize: 15,
                        flexDirection: "row",
                        alignItems: "center",
                        color: isDark ? "white" : "black"
                    }, 
                    headerStyle : { 
                        backgroundColor: isDark ? darkTheme.backColor : lightTheme.headerColor,
                        height: 180,
                        marginBottom: 20,
                    },
                    contentText: {
                        fontSize: 15,
                        flexDirection: "row",
                        alignItems: "center",
                        color: isDark ? "white" : "black",
                    },			
                    headerMarkTitle : { 
                        color: "white",
                        fontSize: 20,
                        marginTop: 50,
                        marginBottom: 0,
                    }, 
                }} 
                // blockBefore={true}
                blockAfter={true}
                centerAlign 
                allowFontScaling = {false} 
                placeholder={selected ? selected : "관람한 날짜를 선택하세요."}
                selectedBgColor={isDark ? darkTheme.pointColor : lightTheme.pointColor}
                selectedTextColor="white"
                customButton={(onConfirm) => customButton(onConfirm)}
                onConfirm={datePick}
            />
        </CalendarBox>
    )
};

const CalendarBox = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 5px;
`;

export default DateContainer;