import styled from "styled-components";
import IsDarkMode from "./isDarkModeInferface";

export const SearchBoxStyle = styled.div<IsDarkMode>`
  position: relative;

  input {
    border: none;
    background-color: ${(props) => (props.isDarkMode ? "#6B728E" : "#fff")};
    color: ${(props) => (props.isDarkMode ? "#dbdbdb" : "#000")};
    border-radius: 10px;
    height: 25px;
    width: 300px;
    text-align: center;
    font-size: 15px;
    transition: background-color 0.2s linear, color 0.2s linear;

    &::placeholder {
      font-style: italic;
      color: ${(props) => (props.isDarkMode ? "#dbdbdb" : "#7d7c7c")};
      transition: color 0.2s linear;
    }

    &:focus {
      outline: none;
    }

    &:focus::placeholder {
      color: transparent;
    }
  }

  &:focus-within .suggestions {
    display: block;
  }

  .suggestions {
    position: absolute;
    cursor: pointer;
    line-height: 1.3;
    font-weight: 200;
    top: 100%;
    left: 0;
    width: 290px;
    background-color: ${(props) => (props.isDarkMode ? "#6B728E" : "#fff")};
    color: ${(props) => (props.isDarkMode ? "#fff" : "#000")};
    transition: background-color 0.2s linear, color 0.2s linear;
    border: 1px solid #87b5ff;
    border-top: none;
    border-radius: 0 0 10px 10px;
    padding: 5px;
    max-height: 150px;
    overflow-y: auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1;

    li {
      padding: 10px;
      cursor: pointer;
      background-color: ${(props) => (props.isDarkMode ? "#6B728E" : "#fff")};
      color: ${(props) => (props.isDarkMode ? "#000" : "#000")};

      &.selected {
        background-color: #000;
        color: #fff;
      }

      &:hover {
        background-color: #f0f0f0;
      }
    }
  }
`;
