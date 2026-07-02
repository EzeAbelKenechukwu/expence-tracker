import styled from "styled-components"
import HomeComponent from "./modules"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding: 24px 16px 40px;
  box-sizing: border-box;
`;

const Hero = styled.div`
  width: 100%;
   margin-left: 40px;
  max-width: 720px;
  background: linear-gradient(135deg, #111827 0%, #1f2937 100%);
  color: white;
  border-radius: 24px;
  padding: 24px 20px;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.18);
  margin-bottom: 18px;
  text-align: left;

  @media (max-width: 600px) {
    padding: 20px 16px;
    border-radius: 18px;
  }
`;

const Title = styled.h1`
  font-size: clamp(1.5rem, 3.2vw, 2.2rem);
  font-weight: 700;
  margin: 0 0 8px;
  letter-spacing: -0.03em;
`;

const Subtitle = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
`;

function App() {
  return (
    <Container>
      <Hero>
        <Title>Expense Tracker</Title>
        <Subtitle>Manage your spending clearly and stay on top of your balance.</Subtitle>
      </Hero>
      <HomeComponent />
    </Container>
  )
}

export default App
