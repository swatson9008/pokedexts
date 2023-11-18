import styled from "styled-components";
import IsDarkMode from "./isDarkModeInferface";

export const ButtonContainer = styled.button<IsDarkMode>`

border-radius: 10px;
flex: 0 0 70px;
color: ${(props) => (props.isDarkMode ? "#f0f0f0" : "#000")};
background-color: ${(props) => (props.isDarkMode ? "#50577A" : "#e2bef7")};
border: ${(props) => (props.isDarkMode ? "2px solid #8a8787" : "2px solid black")};
transition: background-color 0.2s linear, color 0.2s linear, border 0.2s linear;
font-size: 15px;
padding: 5px;
text-align: center;
//margin-top: 5px;
cursor: pointer;
`
