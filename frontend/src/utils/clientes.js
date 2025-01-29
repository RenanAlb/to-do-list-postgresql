const url = "http://localhost:8080";

export const cadastrarCliente = async (nome, senha) => {
  try {
    const response = await fetch(`${url}/clientes/cadastrar-cliente`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, senha }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Erro inesperado ao cadastrar o usuário");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const loginCliente = async (nome, senha) => {
  try {
    const response = await fetch(`${url}/clientes/login-cliente`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, senha }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Erro inesperado ao logar o usuário");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const credenciaisCliente = async () => {
  try {
    const response = await fetch(`${url}/clientes/credentials-user`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Erro inesperado ao buscar as credenciais do usuário");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
