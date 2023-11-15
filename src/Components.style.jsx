import styled from 'styled-components'


export const EditButton = styled.button`
width: 80px;
height: 35px;
background-color: #ffba32;
border: 1px solid #ffba32;
border-radius: 2px;
cursor: pointer;
font-weight: 400;
font-size: 18px;
transform: translate(${({left})=>left},${({top})=>top});
`