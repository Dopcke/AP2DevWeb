function verificarSenha() {
    const senhaDigitada = obterSenhaDigitada();
    const senhaCorreta = 'botafogo';
    const token = 'TokenDaSenha';

    if (verificarSenhaCorreta(senhaDigitada, senhaCorreta)) {
        armazenarToken(token);
        redirecionarParaPaginaPrincipal();
    } else {
        exibirMensagemErro('Senha incorreta. Tente digitando botafogo dessa vez.');
    }
}

function obterSenhaDigitada() {
    return document.getElementById('senha').value;
}

function verificarSenhaCorreta(senhaDigitada, senhaCorreta) {
    return md5(senhaDigitada) === md5(senhaCorreta);
}

function armazenarToken(token) {
    localStorage.setItem('token', token);
}

function redirecionarParaPaginaPrincipal() {
    window.location.href = 'principal.html';
}

function exibirMensagemErro(mensagem) {
    document.getElementById('mensagemErro').textContent = mensagem;
}


