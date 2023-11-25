import styled from "styled-components";
import IsDarkMode from "./isDarkModeInferface";

export const ButtonContainer = styled.button<IsDarkMode>`
@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@500&family=Inter&family=Karla:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=VT323&display=swap');
border-radius: 10px;
flex: 0 0 70px;
color: ${(props) => (props.isDarkMode ? "#f0f0f0" : "#000")};
background-color: ${(props) => (props.isDarkMode ? "#50577A" : "#e2bef7")};
border: ${(props) => (props.isDarkMode ? "2px solid #8a8787" : "2px solid black")};
transition: background-color 0.2s linear, color 0.2s linear, border 0.2s linear;
font-size: 15px;
font-family: 'VT323', monospace;
padding: 5px;
text-align: center;
cursor: pointer;
`
