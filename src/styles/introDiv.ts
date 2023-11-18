import styled from "styled-components";
import IsDarkMode from "./isDarkModeInferface";

export const TextIntroContainer = styled.div<IsDarkMode>`

background-color: ${(props) => (props.isDarkMode ? "#6B728E" : "rgba(235, 235, 235, 0.8)")};
color: ${(props) => (props.isDarkMode ? "#f0f0f0" : "#000")};
padding: 15px;
border-radius: 15px;
margin-bottom: 10px;
transition: background-color 0.2s linear, color 0.2s linear;

`
