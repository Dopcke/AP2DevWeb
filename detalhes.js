function verificarAutenticacao() {
  const token = localStorage.getItem('token');
  return !!token; 
}

if (!verificarAutenticacao()) {
  window.location.href = 'index.html'; 
}

const queryString = window.location.search;

function getQueryParam(parameter) {
  const params = new URLSearchParams(queryString);
  return params.get(parameter);
}

const atletaId = getQueryParam('id');

if (atletaId !== null && atletaId !== '') {
  const endpointUrl = `https://botafogo-atletas.mange.li/${atletaId}`;

  fetch(endpointUrl)
    .then(resposta => {
      if (!resposta.ok) {
        throw new Error('Erro ao obter dados do atleta');
      }
      return resposta.json();
    })
    .then(atletaData => {
      const detalhesAtletaDiv = document.createElement('div');
      detalhesAtletaDiv.id = 'detalhes-atleta';

      const imagem = document.createElement('img');
      imagem.src = atletaData.imagem;
      imagem.alt = `foto de ${atletaData.nome}`;

      const nome = document.createElement('h2');
      nome.textContent = atletaData.nome;

      const posicao = document.createElement('p');
      posicao.textContent = `Posição: ${atletaData.posicao}`;

      const descricao = document.createElement('p');
      descricao.textContent = `Descrição: ${atletaData.descricao}`;

      const nomeCompleto = document.createElement('p');
      nomeCompleto.textContent = `Nome Completo: ${atletaData.nome_completo}`;

      const nascimento = document.createElement('p');
      nascimento.textContent = `Nascimento: ${atletaData.nascimento}`;

      const altura = document.createElement('p');
      altura.textContent = `Altura: ${atletaData.altura}`;

      const botaoVoltar = document.createElement('button');
      botaoVoltar.id = 'voltar';
      botaoVoltar.textContent = 'Voltar';

      botaoVoltar.onclick = function() {
        window.history.back();
      };

      detalhesAtletaDiv.appendChild(imagem);
      detalhesAtletaDiv.appendChild(nome);
      detalhesAtletaDiv.appendChild(posicao);
      detalhesAtletaDiv.appendChild(descricao);
      detalhesAtletaDiv.appendChild(nomeCompleto);
      detalhesAtletaDiv.appendChild(nascimento);
      detalhesAtletaDiv.appendChild(altura);
      detalhesAtletaDiv.appendChild(botaoVoltar);

      document.body.appendChild(detalhesAtletaDiv);
    })

    .catch(error => {
      console.error('Erro:', error);
      const mensagemErro = document.createElement('p');
      mensagemErro.textContent = 'Erro ao carregar os detalhes do atleta.';
      document.body.appendChild(mensagemErro);
    });
} else {
  console.error('ID do atleta não fornecido na URL.');
  const mensagemErro = document.createElement('p');
  mensagemErro.textContent = 'ID do atleta não fornecido na URL.';
  document.body.appendChild(mensagemErro);
}
