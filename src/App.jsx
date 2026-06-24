import styled from "styled-components"
import HomeComponent from "./modules"

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin: 30px auto;
padding: 0 15px;
width: 100%;
box-sizing: border-box;
`;

const Header = styled.span`
color: black;
font-size: clamp(20px, 5vw, 25px);
font-weight: bold;
text-align: center;
`

function App() {
  return (
    <Container>
      <Header>Expense Tracker</Header>
      <HomeComponent/>
    </Container>
  )
}

export default App
