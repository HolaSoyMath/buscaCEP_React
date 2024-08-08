import React from "react";
import { FiSearch } from "react-icons/fi";
import "./styles.css";

function App() {
  // Iniciar variaveis de pesquisa e de retorno de dados
  const [input, setInput] = React.useState(null);
  const [dados, setDados] = React.useState(null);

  function handleSearch() {
    // Verificar se tem algo escrito no input
    if (input === "") {
      alert("Insira um CEP");
      return;
    }

    // Requisição para a API
    fetch(`http://viacep.com.br/ws/${input}/json/`)
      .then((response) => response.json())
      .then((data) => {
        // Caso devolva algum valor, colocar em "dados" e resetar o campo de input
        setDados(data);
        setInput("");
      })
      .catch(() => {
        // Caso nao encontre nenhum valor, 
        setDados(null);
        setInput("");
        alert("o CEP não foi encontrado, digite um CEP válido");
      });
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>
      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu CEP"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff" />
        </button>
      </div>
      {dados && (
        <main className="main">
          <h2>CEP: {dados.cep}</h2>
          <span>{dados.logradouro}</span>
          {dados.complemento && <span>Complemento: {dados.complemento}</span>}
          <span>{dados.bairro}</span>
          <span>
            {dados.localidade} - {dados.uf}
          </span>
        </main>
      )}
    </div>
  );
}

export default App;
