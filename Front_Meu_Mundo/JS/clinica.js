
/* =========================================
   MEU MUNDO - FUNCIONALIDADES DA CLÍNICA
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // DATA ATUAL
    const dataAtual = document.getElementById("dataAtual");

    if (dataAtual) {
        const hoje = new Date();

        dataAtual.textContent = hoje.toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    }

    // IDENTIFICAÇÃO DA CLÍNICA
    const dadosClinica = JSON.parse(
        localStorage.getItem("meuMundoClinica") || "{}"
    );

    const nomeClinica = dadosClinica.nome || "Clínica Meu Mundo";

    const nomeElemento = document.getElementById("nomeClinica");
    const perfilElemento = document.getElementById("nomePerfil");

    if (nomeElemento) {
        nomeElemento.textContent = nomeClinica;
    }

    if (perfilElemento) {
        perfilElemento.textContent = nomeClinica;
    }

    // BOTÃO DE PERFIL
    const botaoPerfil = document.getElementById("botaoPerfil");

    if (botaoPerfil) {
        botaoPerfil.addEventListener("click", () => {
            alert(
                "Área de perfil da clínica.\n" +
                "Em breve você poderá editar os dados institucionais."
            );
        });
    }

    // NOTIFICAÇÕES
    const botaoNotificacao = document.querySelector(
        ".botao-notificacao"
    );

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
