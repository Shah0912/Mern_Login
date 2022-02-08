import styled from 'styled-components';
import MainBox from './MainBox'
import {useParams} from 'react-router-dom'


const Container = styled.div`
width: 100vw;
height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background-color: #DFD3EB;
`;

export default function ResetPassword() {
    const {token} = useParams();
    return(
        <Container>
            <MainBox token={token}/>
        </Container>
        
    )
}