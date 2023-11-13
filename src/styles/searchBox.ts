import styled from "styled-components";

export const SearchBoxStyle = styled.div`
  position: relative;

  input {
    border: 1px solid #87b5ff;
    border-radius: 10px;
    height: 3vh;
    width: 300px;
    text-align: center;
    font-size: 15px;

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
    top: 100%;
    left: 0;
    width: 300px;
    background-color: #fff;
    border: 1px solid #87b5ff;
    border-top: none;
    border-radius: 0 0 10px 10px;
    max-height: 150px;
    overflow-y: auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1;

    li {
      padding: 10px;
      cursor: pointer;


      &:hover {
        background-color: #f0f0f0;
      }
    }
  }
`;
