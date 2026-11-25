
/* =========================================
   MEU MUNDO - PERFIL PROFISSIONAL
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

    // CARREGAR DADOS DO PROFISSIONAL
    function obterDados(chave) {
        try {
            return JSON.parse(localStorage.getItem(chave) || "{}");
        } catch (erro) {
            console.error("Erro ao carregar os dados:", erro);
            return {};
        }
    }

    const profissional = obterDados("meuMundoProfissional");

    const nome = profissional.apelido ||
                 profissional.nome ||
                 "Profissional";

    const especialidade = profissional.especialidade ||
                          "Minha especialidade";

    // IDENTIFICAÇÃO DO PROFISSIONAL
    const nomeProfissional = document.getElementById("nomeProfissional");
    const nomePerfil = document.getElementById("nomePerfil");
    const especialidadePerfil = document.getElementById("especialidadePerfil");

    if (nomeProfissional) {
        nomeProfissional.textContent = nome;
    }

    if (nomePerfil) {
        nomePerfil.textContent = nome;
    }

    if (especialidadePerfil) {
        especialidadePerfil.textContent = especialidade;
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
                window.location.href = "../acesso/login.html";
            }
        });
    }

});
