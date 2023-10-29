import styled from "styled-components";

export const SearchBoxStyle = styled.input`

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
`
