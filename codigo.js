function verificarAutenticacao() {
    const token = localStorage.getItem('token');
    return !!token; 
  }
  
  if (!verificarAutenticacao()) {
    window.location.href = 'index.html'; 
  }

  class AtletaManager {
    constructor() {
        this.body = document.body;
        this.divFiltro = this.createAndAppendElement('div', 'filtros');
        this.divContainer = this.createAndAppendElement('div', 'container');

        this.btnMasculino = this.criarBotao('MASCULINO', 'https://botafogo-atletas.mange.li/masculino');
        this.btnFeminino = this.criarBotao('FEMININO', 'https://botafogo-atletas.mange.li/feminino');
        this.btnElencoCompleto = this.criarBotao('ELENCO COMPLETO', 'https://botafogo-atletas.mange.li/all');

        this.divFiltro.appendChild(this.btnMasculino);
        this.divFiltro.appendChild(this.btnFeminino);
        this.divFiltro.appendChild(this.btnElencoCompleto);

        this.body.appendChild(this.divFiltro);
        this.body.appendChild(this.divContainer);

        this.btnFeminino.addEventListener('click', () => { this.botaoClicado = true; });
        this.btnMasculino.addEventListener('click', () => { this.botaoClicado = true; });
        this.btnElencoCompleto.addEventListener('click', () => { this.botaoClicado = true; });
    }

    createAndAppendElement(tagName, id) {
        const element = document.createElement(tagName);
        element.id = id;
        return element;
    }

    criarBotao(texto, url) {
        const botao = document.createElement('button');
        botao.innerHTML = texto;
        botao.dataset.url = url;
        botao.addEventListener('click', async () => {
            this.divContainer.innerHTML = '';
            const atletas = await this.obterAtletas(url);
            atletas.forEach(atleta => {
                this.criaCartao(atleta);
            });
            this.botaoClicado = true;
        });
        return botao;
    }

    async obterAtletas(url) {
        const resposta = await fetch(url);
        const dados = await resposta.json();
        return dados;
    }

    criaCartao(entrada) {
        const containerAtleta = document.createElement('article');
        containerAtleta.dataset.id = entrada.id;
        containerAtleta.dataset.altura = entrada.altura;
        containerAtleta.dataset.nome_completo = entrada.nome_completo;
        containerAtleta.dataset.nascimento = entrada.nascimento;

        const imagem = document.createElement('img');
        imagem.src = entrada.imagem;
        imagem.alt = `foto de ${entrada.nome}`;

        const nome = document.createElement('p');
        nome.textContent = entrada.nome;

        containerAtleta.appendChild(imagem);
        containerAtleta.appendChild(nome);

        containerAtleta.onclick = this.manipulaClick.bind(this);

        this.divContainer.appendChild(containerAtleta);
    }

    manipulaClick(e) {
        const artigo = e.target.closest('article');
        window.location = `detalhes.html?id=${artigo.dataset.id}`;
    }
}

const atletaManager = new AtletaManager();
