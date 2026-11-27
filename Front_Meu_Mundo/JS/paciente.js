
document.addEventListener("DOMContentLoaded", () => {
    const CHAVE_PACIENTES = "meuMundoPacientes";

    const elementos = {
        lista: document.getElementById("listaPacientes"),
        busca: document.getElementById("campoBusca"),
        filtro: document.getElementById("filtroStatus"),
        mensagemVazia: document.getElementById("mensagemVazia"),
        contador: document.getElementById("contadorResultados"),

        total: document.getElementById("totalPacientes"),
        ativos: document.getElementById("pacientesAtivos"),
        iniciais: document.getElementById("pacientesIniciais"),

        modal: document.getElementById("modalPaciente"),
        modalDetalhes: document.getElementById("modalDetalhes"),
        form: document.getElementById("formPaciente"),

        id: document.getElementById("pacienteId"),
        nome: document.getElementById("nomePaciente"),
        idade: document.getElementById("idadePaciente"),
        responsavel: document.getElementById("responsavelPaciente"),
        foco: document.getElementById("focoPaciente"),
        status: document.getElementById("statusPaciente"),
        observacoes: document.getElementById("observacoesPaciente")
    };

    // Pacientes fictícios para a primeira apresentação.
    const pacientesExemplo = [
        {
            id: "paciente-1",
            nome: "Ana Clara Oliveira",
            idade: 8,
            responsavel: "Mariana Oliveira",
            foco: "Comunicação e autonomia",
            status: "ativo",
            observacoes: "Exemplo de cadastro para demonstração."
        },
        {
            id: "paciente-2",
            nome: "Pedro Henrique Santos",
            idade: 10,
            responsavel: "Carlos Santos",
            foco: "Leitura e aprendizagem",
            status: "inicial",
            observacoes: "Exemplo de cadastro para demonstração."
        },
        {
            id: "paciente-3",
            nome: "Sofia Almeida Costa",
            idade: 7,
            responsavel: "Juliana Costa",
            foco: "Organização da rotina",
            status: "ativo",
            observacoes: "Exemplo de cadastro para demonstração."
        }
    ];

    function carregarPacientes() {
        try {
            const dados = localStorage.getItem(CHAVE_PACIENTES);

            if (dados === null) {
                localStorage.setItem(
                    CHAVE_PACIENTES,
                    JSON.stringify(pacientesExemplo)
                );
                return [...pacientesExemplo];
            }

            const pacientes = JSON.parse(dados);
            return Array.isArray(pacientes) ? pacientes : [];
        } catch (erro) {
            console.error("Erro ao carregar pacientes:", erro);
            return [];
        }
    }

    let pacientes = carregarPacientes();

    function salvarPacientes() {
        try {
            localStorage.setItem(CHAVE_PACIENTES, JSON.stringify(pacientes));
            return true;
        } catch (erro) {
            console.error("Erro ao salvar pacientes:", erro);
            alert("Não foi possível salvar os dados neste navegador.");
            return false;
        }
    }

    function escaparHTML(valor) {
        return String(valor ?? "").replace(/[&<>"']/g, caractere => {
            const entidades = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"
            };

            return entidades[caractere];
        });
    }

    function nomeStatus(status) {
        const nomes = {
            ativo: "Ativo",
            inicial: "Acompanhamento inicial",
            pausado: "Pausado"
        };

        return nomes[status] || "Não informado";
    }

    function atualizarIndicadores() {
        elementos.total.textContent = pacientes.length;

        elementos.ativos.textContent = pacientes.filter(
            paciente => paciente.status === "ativo"
        ).length;

        elementos.iniciais.textContent = pacientes.filter(
            paciente => paciente.status === "inicial"
        ).length;
    }

    function renderizarPacientes() {
        const termo = elementos.busca.value
            .trim()
            .toLocaleLowerCase("pt-BR");

        const statusSelecionado = elementos.filtro.value;

        const filtrados = pacientes.filter(paciente => {
            const correspondeNome = paciente.nome
                .toLocaleLowerCase("pt-BR")
                .includes(termo);

            const correspondeStatus =
                statusSelecionado === "todos" ||
                paciente.status === statusSelecionado;

            return correspondeNome && correspondeStatus;
        });

        elementos.lista.innerHTML = filtrados.map(paciente => `
            <tr>
                <td>
                    <span class="nome-paciente">${escaparHTML(paciente.nome)}</span>
                    <span class="detalhe-paciente">Paciente Meu Mundo!</span>
                </td>

                <td>${escaparHTML(paciente.idade)} anos</td>

                <td>${escaparHTML(paciente.responsavel || "Não informado")}</td>

                <td>${escaparHTML(paciente.foco || "Não informado")}</td>

                <td>
                    <span class="status-paciente status-${escaparHTML(paciente.status)}">
                        ${escaparHTML(nomeStatus(paciente.status))}
                    </span>
                </td>

                <td>
                    <div class="acoes-linha">
                        <button
                            type="button"
                            class="botao-acao"
                            data-acao="detalhes"
                            data-id="${escaparHTML(paciente.id)}">
                            Ver
                        </button>

                        <button
                            type="button"
                            class="botao-acao"
                            data-acao="editar"
                            data-id="${escaparHTML(paciente.id)}">
                            Editar
                        </button>
                    </div>
                </td>
            </tr>
        `).join("");

        elementos.mensagemVazia.hidden = filtrados.length > 0;

        elementos.contador.textContent =
            `${filtrados.length} ${filtrados.length === 1 ? "paciente encontrado" : "pacientes encontrados"}`;

        atualizarIndicadores();
    }

    function abrirModalCadastro() {
        elementos.form.reset();
        elementos.id.value = "";
        document.getElementById("tituloModal").textContent = "Novo paciente";
        elementos.modal.querySelector(".modal-cabecalho p").textContent =
            "Preencha as informações para cadastrar o paciente.";

        elementos.modal.hidden = false;
        elementos.nome.focus();
    }

    function abrirModalEdicao(id) {
        const paciente = pacientes.find(item => item.id === id);

        if (!paciente) return;

        elementos.id.value = paciente.id;
        elementos.nome.value = paciente.nome;
        elementos.idade.value = paciente.idade;
        elementos.responsavel.value = paciente.responsavel || "";
        elementos.foco.value = paciente.foco || "";
        elementos.status.value = paciente.status;
        elementos.observacoes.value = paciente.observacoes || "";

        document.getElementById("tituloModal").textContent = "Editar paciente";
        elementos.modal.querySelector(".modal-cabecalho p").textContent =
            "Atualize as informações do paciente.";

        elementos.modal.hidden = false;
        elementos.nome.focus();
    }

    function abrirDetalhes(id) {
        const paciente = pacientes.find(item => item.id === id);

        if (!paciente) return;

        document.getElementById("tituloDetalhes").textContent = paciente.nome;

        const campos = [
            ["Idade", `${paciente.idade} anos`],
            ["Situação", nomeStatus(paciente.status)],
            ["Responsável", paciente.responsavel || "Não informado"],
            ["Foco do acompanhamento", paciente.foco || "Não informado"],
            ["Observações", paciente.observacoes || "Nenhuma observação cadastrada."]
        ];

        document.getElementById("conteudoDetalhes").innerHTML =
            campos.map(([titulo, valor], indice) => `
                <div class="detalhe-item ${indice === 4 ? "largura-total" : ""}">
                    <span>${escaparHTML(titulo)}</span>
                    <strong>${escaparHTML(valor)}</strong>
                </div>
            `).join("");

        elementos.modalDetalhes.hidden = false;
    }

    function fecharModais() {
        elementos.modal.hidden = true;
        elementos.modalDetalhes.hidden = true;
    }

    // Abrir cadastro.
    document.getElementById("botaoNovoPaciente")
        .addEventListener("click", abrirModalCadastro);

    // Fechar modais pelos botões.
    document.querySelectorAll("[data-fechar-modal]").forEach(botao => {
        botao.addEventListener("click", fecharModais);
    });

    // Fechar clicando fora da caixa.
    document.querySelectorAll(".modal-fundo").forEach(modal => {
        modal.addEventListener("click", evento => {
            if (evento.target === modal) {
                fecharModais();
            }
        });
    });

    // Fechar com a tecla Escape.
    document.addEventListener("keydown", evento => {
        if (evento.key === "Escape") {
            fecharModais();
        }
    });

    // Salvar cadastro ou edição.
    elementos.form.addEventListener("submit", evento => {
        evento.preventDefault();

        const nome = elementos.nome.value.trim();
        const idade = Number(elementos.idade.value);

        if (!nome || !Number.isInteger(idade) || idade < 1 || idade > 120) {
            alert("Confira o nome e a idade informados.");
            return;
        }

        const idExistente = elementos.id.value;

        const dadosPaciente = {
            id: idExistente || (
                "paciente-" + Date.now() + "-" + Math.random().toString(16).slice(2)
            ),
            nome,
            idade,
            responsavel: elementos.responsavel.value.trim(),
            foco: elementos.foco.value.trim(),
            status: elementos.status.value,
            observacoes: elementos.observacoes.value.trim()
        };

        if (idExistente) {
            pacientes = pacientes.map(paciente =>
                paciente.id === idExistente ? dadosPaciente : paciente
            );
        } else {
            pacientes.push(dadosPaciente);
        }

        if (!salvarPacientes()) return;

        fecharModais();
        renderizarPacientes();

        alert(
            idExistente
                ? "Paciente atualizado com sucesso!"
                : "Paciente cadastrado com sucesso!"
        );
    });

    // Ações de visualizar e editar.
    elementos.lista.addEventListener("click", evento => {
        const botao = evento.target.closest("[data-acao]");

        if (!botao) return;

        const id = botao.dataset.id;

        if (botao.dataset.acao === "detalhes") {
            abrirDetalhes(id);
        }

        if (botao.dataset.acao === "editar") {
            abrirModalEdicao(id);
        }
    });

    // Busca e filtros.
    elementos.busca.addEventListener("input", renderizarPacientes);
    elementos.filtro.addEventListener("change", renderizarPacientes);

    // Dados demonstrativos do profissional.
    try {
        const profissional = JSON.parse(
            localStorage.getItem("meuMundoProfissional") || "{}"
        );

        if (profissional.nome) {
            document.getElementById("nomePerfil").textContent = profissional.nome;
        }

        if (profissional.especialidade) {
            document.getElementById("especialidadePerfil").textContent =
                profissional.especialidade;
        }
    } catch (erro) {
        console.warn("Não foi possível carregar o perfil profissional.", erro);
    }

    // Data e ações do cabeçalho.
    document.getElementById("botaoNotificacao").addEventListener("click", () => {
        alert("Você não possui novas notificações.");
    });

    document.getElementById("botaoSair").addEventListener("click", () => {
        const confirmar = confirm("Deseja realmente sair da sua conta?");

        if (confirmar) {
            localStorage.removeItem("meuMundoSessao");
            sessionStorage.removeItem("meuMundoSessao");
            window.location.href = "../acesso/login.html";
        }
    });

    // Primeira exibição.
    renderizarPacientes();
});