import { Container } from "./styles";

const Animation = () => {
  return (
    <Container>
      <l-line-spinner
        size="40"
        stroke="3"
        speed="1"
        color="white"
      ></l-line-spinner>
      <p>Carregando, aguarde...</p>
    </Container>
  );
};

export default Animation;
