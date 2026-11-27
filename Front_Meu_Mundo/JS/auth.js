
/* =========================================
   MEU MUNDO — AUTENTICAÇÃO DEMONSTRATIVA
========================================= */

const destinosPorPerfil = {
    crianca: "../crianca/index.html",
    responsavel: "../responsavel/index.html",
    profissional: "../profissional/index.html",
    clinica: "../clinica/index.html"
};

const nomesPerfis = {
    crianca: "Criança",
    responsavel: "Responsável",
    profissional: "Profissional",
    clinica: "Clínica"
};

document.addEventListener("DOMContentLoaded", () => {

    const formLogin = document.getElementById("formLogin");
    const campoEmail = document.getElementById("email");
    const campoSenha = document.getElementById("senha");
    const mostrarSenha = document.getElementById("mostrarSenha");
    const mensagem = document.getElementById("mensagemLogin");
    const botaoEntrar = document.getElementById("botaoEntrar");
    const manterConectado = document.getElementById("manterConectado");
    const botaoDemo = document.getElementById("botaoDemo");
    const perfilDemo = document.getElementById("perfilDemo");
    const perfilSolicitado = new URLSearchParams(window.location.search).get("perfil");
    const perfilSelecionado = Object.prototype.hasOwnProperty.call(
        destinosPorPerfil,
        perfilSolicitado
    ) ? perfilSolicitado : null;

    if (perfilSelecionado) {
        perfilDemo.value = perfilSelecionado;
    }

    // =====================================
    // TEMAS VISUAIS
    // =====================================

    const botoesTema = document.querySelectorAll("[data-tema]");

    function aplicarTema(tema) {

        const temasPermitidos = ["claro", "escuro", "contraste"];

        if (!temasPermitidos.includes(tema)) {
            tema = "claro";
        }

        document.body.dataset.theme = tema;

        localStorage.setItem("meuMundoTema", tema);

        botoesTema.forEach(botao => {

            const selecionado = botao.dataset.tema === tema;

            botao.classList.toggle("ativo", selecionado);
            botao.setAttribute("aria-pressed", String(selecionado));

        });
    }

    const temaSalvo = localStorage.getItem("meuMundoTema") || "claro";

    aplicarTema(temaSalvo);

    botoesTema.forEach(botao => {

        botao.addEventListener("click", () => {
            aplicarTema(botao.dataset.tema);
        });

    });

    if (!formLogin) return;

    // =====================================
    // MOSTRAR OU OCULTAR SENHA
    // =====================================

    mostrarSenha.addEventListener("click", () => {

        const senhaVisivel = campoSenha.type === "text";

        campoSenha.type = senhaVisivel ? "password" : "text";

        mostrarSenha.textContent = senhaVisivel ? "👁️" : "🙈";

        mostrarSenha.setAttribute(
            "aria-label",
            senhaVisivel ? "Mostrar senha" : "Ocultar senha"
        );

        mostrarSenha.setAttribute(
            "aria-pressed",
            String(!senhaVisivel)
        );

    });

    // =====================================
    // MENSAGENS
    // =====================================

    function exibirMensagem(texto, tipo = "erro") {

        mensagem.textContent = texto;

        mensagem.dataset.tipo = tipo;

    }

    // =====================================
    // CONTAS CADASTRADAS NO PROTÓTIPO
    // =====================================

    function obterUsuarios() {

        try {

            return JSON.parse(
                localStorage.getItem("meuMundoUsuarios") || "[]"
            );

        } catch (erro) {

            return [];

        }

    }

    // =====================================
    // REDIRECIONAMENTO
    // =====================================

    function iniciarSessao(usuario) {
        const perfil = usuario.perfil;
        const destino = destinosPorPerfil[perfil];

        if (!destino) {
            exibirMensagem("O perfil desta conta não é reconhecido.");
            return;
        }

        if (perfilSelecionado && perfil !== perfilSelecionado) {
            exibirMensagem(
                `Esta conta está cadastrada como ${nomesPerfis[perfil]}. Selecione esse perfil para continuar.`
            );
            return;
        }

        const sessao = {
            nome: usuario.nome || usuario.apelido || "Usuário",
            email: usuario.email || "",
            perfil,
            inicio: new Date().toISOString()
        };

        const armazenamento = manterConectado.checked
            ? localStorage
            : sessionStorage;

        armazenamento.setItem(
            "meuMundoSessao",
            JSON.stringify(sessao)
        );

        window.location.href = destino;

    }

    // =====================================
    // LOGIN COM CONTA CADASTRADA
    // =====================================

    formLogin.addEventListener("submit", (evento) => {

        evento.preventDefault();

        exibirMensagem("");

        const email = campoEmail.value.trim().toLowerCase();
        const senha = campoSenha.value;

        if (!email || !senha) {

            exibirMensagem("Preencha seu e-mail e sua senha.");

            return;

        }

        const usuarios = obterUsuarios();

        const usuario = usuarios.find(item =>
            item.email?.toLowerCase() === email &&
            item.senha === senha
        );

        if (!usuario) {

            exibirMensagem(
                "Não encontramos uma conta com esses dados. Confira suas informações ou utilize o acesso demonstrativo."
            );

            return;

        }

        iniciarSessao(usuario);

    });

    // =====================================
    // ACESSO DEMONSTRATIVO
    // =====================================

    botaoDemo.addEventListener("click", () => {

        const perfis = {
            crianca: "Criança",
            responsavel: "Responsável",
            profissional: "Profissional",
            clinica: "Clínica"
        };

        const perfil = perfilDemo.value;

        const usuarioDemo = {
            nome: perfis[perfil],
            email: `demo.${perfil}@meumundo.local`,
            perfil: perfil
        };

        iniciarSessao(usuarioDemo);

    });

});

document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formRecuperarSenha");

    if (!formulario) return;

    const campoEmail = document.getElementById("emailRecuperacao");
    const mensagem = document.getElementById("mensagemRecuperacao");

    formulario.addEventListener("submit", evento => {
        evento.preventDefault();

        const email = campoEmail.value.trim().toLowerCase();

        if (!email || !campoEmail.validity.valid) {
            mensagem.textContent = "Digite um e-mail válido.";
            mensagem.className = "mensagem-formulario erro";
            campoEmail.focus();
            return;
        }

        let usuarios;

        try {
            usuarios = JSON.parse(localStorage.getItem("meuMundoUsuarios") || "[]");

            if (!Array.isArray(usuarios)) {
                throw new Error("Os dados de contas não estão em uma lista válida.");
            }
        } catch (erro) {
            console.error("Não foi possível consultar os cadastros demonstrativos.", erro);
            mensagem.textContent = "Não foi possível verificar os cadastros neste navegador.";
            mensagem.className = "mensagem-formulario erro";
            return;
        }

        const contaEncontrada = usuarios.some(usuario =>
            usuario.email?.toLowerCase() === email
        );

        mensagem.textContent = contaEncontrada
            ? "Encontramos esse e-mail. O envio de redefinição será disponibilizado quando houver um backend."
            : "Não encontramos um cadastro com esse e-mail.";
        mensagem.className = `mensagem-formulario ${contaEncontrada ? "sucesso" : "erro"}`;
    });
});


/* ========================================
   CADASTRO DE USUÁRIOS - MEU MUNDO
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.getElementById("formCadastro");

    // Esta parte só será executada na tela de cadastro.
    if (!formulario) return;

    const campoNome = document.getElementById("nome");
    const campoApelido = document.getElementById("apelido");
    const campoEmail = document.getElementById("emailCadastro");
    const campoPerfil = document.getElementById("perfil");
    const campoSenha = document.getElementById("senhaCadastro");
    const campoConfirmar = document.getElementById("confirmarSenha");
    const campoTermos = document.getElementById("aceiteTermos");

    const mensagem = document.getElementById("mensagemCadastro");
    const botaoCadastrar = document.getElementById("botaoCadastrar");

    // Mostrar ou ocultar senhas
    document.querySelectorAll("[data-visualizar]").forEach(function (botao) {

        botao.addEventListener("click", function () {

            const idCampo = botao.dataset.visualizar;
            const campo = document.getElementById(idCampo);

            if (!campo) return;

            const senhaVisivel = campo.type === "text";

            campo.type = senhaVisivel ? "password" : "text";

            botao.textContent = senhaVisivel ? "👁️" : "🙈";

            botao.setAttribute(
                "aria-label",
                senhaVisivel ? "Mostrar senha" : "Ocultar senha"
            );
        });

    });

    // Exibir mensagens
    function exibirMensagem(texto, tipo) {

        mensagem.textContent = texto;
        mensagem.className = "mensagem-formulario " + tipo;

    }

    // Obter usuários já cadastrados
    function obterUsuariosCadastro() {

        try {

            const dados = localStorage.getItem("meuMundoUsuarios");

            if (!dados) return [];

            const usuarios = JSON.parse(dados);

            return Array.isArray(usuarios) ? usuarios : [];

        } catch (erro) {

            console.error("Erro ao consultar usuários:", erro);

            return [];

        }

    }

    // Registrar novo usuário
    formulario.addEventListener("submit", function (evento) {

        evento.preventDefault();

        const nome = campoNome.value.trim();
        const apelido = campoApelido.value.trim();
        const email = campoEmail.value.trim().toLowerCase();
        const perfil = campoPerfil.value;
        const senha = campoSenha.value;
        const confirmarSenha = campoConfirmar.value;

        if (!nome || !apelido || !email || !perfil || !senha || !confirmarSenha) {

            exibirMensagem(
                "Preencha todos os campos para continuar.",
                "erro"
            );

            return;

        }

        if (nome.length < 3) {

            exibirMensagem(
                "Digite um nome completo válido.",
                "erro"
            );

            return;

        }

        if (!campoEmail.validity.valid) {

            exibirMensagem(
                "Digite um endereço de e-mail válido.",
                "erro"
            );

            campoEmail.focus();

            return;

        }

        if (senha.length < 8) {

            exibirMensagem(
                "Sua senha precisa ter pelo menos 8 caracteres.",
                "erro"
            );

            campoSenha.focus();

            return;

        }

        if (senha !== confirmarSenha) {

            exibirMensagem(
                "As senhas não coincidem. Confira e tente novamente.",
                "erro"
            );

            campoConfirmar.focus();

            return;

        }

        if (!campoTermos.checked) {

            exibirMensagem(
                "É necessário aceitar os termos para continuar.",
                "erro"
            );

            return;

        }

        const usuarios = obterUsuariosCadastro();

        // Verificar se o e-mail já está cadastrado
        const emailExiste = usuarios.some(function (usuario) {

            return usuario.email.toLowerCase() === email;

        });

        if (emailExiste) {

            exibirMensagem(
                "Este e-mail já possui um cadastro. Experimente entrar na sua conta.",
                "erro"
            );

            return;

        }

        // Criar novo usuário
        const novoUsuario = {

            nome: nome,
            apelido: apelido,
            email: email,
            senha: senha,
            perfil: perfil,
            dataCadastro: new Date().toISOString()

        };

        try {

            usuarios.push(novoUsuario);

            localStorage.setItem(
                "meuMundoUsuarios",
                JSON.stringify(usuarios)
            );

            sessionStorage.setItem(
                "meuMundoSessao",
                JSON.stringify({
                    nome: nome || apelido,
                    email,
                    perfil,
                    inicio: new Date().toISOString()
                })
            );

            exibirMensagem(
                "Sua conta foi criada com sucesso! 🌈 Redirecionando para o Meu Mundo.",
                "sucesso"
            );

            botaoCadastrar.disabled = true;

            botaoCadastrar.textContent = "Cadastro realizado! ✓";

            // Redirecionar para a página inicial
            setTimeout(function () {

                window.location.href = destinosPorPerfil[perfil];

            }, 1800);

        } catch (erro) {

            console.error("Erro ao salvar cadastro:", erro);

            exibirMensagem(
                "Não foi possível concluir o cadastro neste navegador.",
                "erro"
            );

        }

    });

});
