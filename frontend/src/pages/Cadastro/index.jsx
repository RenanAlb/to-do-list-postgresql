import { Container, Form, Input, Button } from "./styles";
import { cadastrarCliente } from "../../utils/clientes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Animation from "../../Components/Animation";

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (nome === "" || senha === "") {
      return console.error("Sem credenciais");
    }

    setIsLoading(true);

    const response = await cadastrarCliente(nome.trim(), senha.trim());

    console.log(response);

    if (response.ok) {
      navigate("/home");
    }

    setIsLoading(false);
  };

  return (
    <Container>
      {isLoading && <Animation />}
      <Form onSubmit={handleSubmitForm}>
        <h2>Cadastrar</h2>
        <Input
          type="text"
          placeholder="Nome de usuário"
          onChange={(e) => setNome(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          onChange={(e) => setSenha(e.target.value)}
        />
        <Button type="submit">Cadastrar</Button>
        <p>
          Já tem uma conta? <a href="/">Clique aqui</a>
        </p>
      </Form>
    </Container>
  );
};

export default Cadastro;
