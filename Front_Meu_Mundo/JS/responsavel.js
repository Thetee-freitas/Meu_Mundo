
/* =========================================
   MEU MUNDO - PERFIL DO RESPONSÁVEL
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // DATA ATUAL
    const dataAtual = document.getElementById("dataAtual");

    if (dataAtual) {
        dataAtual.textContent = new Date().toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    }

    // DADOS DO RESPONSÁVEL
    function obterDados(chave) {
        try {
            return JSON.parse(localStorage.getItem(chave) || "{}");
        } catch (erro) {
            console.error("Não foi possível carregar os dados:", erro);
            return {};
        }
    }

    const responsavel = obterDados("meuMundoResponsavel");
    const crianca = obterDados("meuMundoCriancaSelecionada");

    // PERSONALIZAR NOME DO RESPONSÁVEL
    const nome = responsavel.apelido ||
                 responsavel.nome ||
                 "Responsável";

    const nomeResponsavel = document.getElementById("nomeResponsavel");
    const nomePerfil = document.getElementById("nomePerfil");

    if (nomeResponsavel) {
        nomeResponsavel.textContent = nome;
    }

    if (nomePerfil) {
        nomePerfil.textContent = nome;
    }

    // PERSONALIZAR CRIANÇA ACOMPANHADA
    const nomeCrianca = document.getElementById("nomeCrianca");
    const apelidoCrianca = document.getElementById("apelidoCrianca");

    if (nomeCrianca && (crianca.nome || crianca.apelido)) {
        nomeCrianca.textContent = crianca.apelido || crianca.nome;
    }

    if (apelidoCrianca && crianca.apelido && crianca.nome) {
        apelidoCrianca.textContent = crianca.nome;
    }

    // BOTÃO DE PERFIL
    const botaoPerfil = document.getElementById("botaoPerfil");

    if (botaoPerfil) {
        botaoPerfil.addEventListener("click", () => {
            window.location.href = "configuracoes.html";
        });
    }

    // NOTIFICAÇÕES
    const botaoNotificacao = document.getElementById("botaoNotificacao");

    if (botaoNotificacao) {
        botaoNotificacao.addEventListener("click", () => {
            alert("Você não possui novas notificações demonstrativas.");
        });
    }

    // SAIR DA PLATAFORMA
    const botaoSair = document.getElementById("botaoSair");

    if (botaoSair) {
        botaoSair.addEventListener("click", () => {

            const confirmar = confirm(
                "Deseja realmente sair do Meu Mundo?"
            );

            if (confirmar) {
                localStorage.removeItem("meuMundoSessao");
                sessionStorage.removeItem("meuMundoSessao");
                window.location.href = "../acesso/login.html";
            }
        });
    }

});
