(() => {
    const perfil = document.body.dataset.perfil;

    if (!perfil) return;

    const dadosSessao = sessionStorage.getItem("meuMundoSessao") ||
        localStorage.getItem("meuMundoSessao");

    if (!dadosSessao) {
        window.location.replace(
            `../acesso/login.html?perfil=${encodeURIComponent(perfil)}`
        );
        return;
    }

    let sessao;

    try {
        sessao = JSON.parse(dadosSessao);
    } catch (erro) {
        console.error("Não foi possível validar a sessão demonstrativa.", erro);
        window.location.replace(
            `../acesso/login.html?perfil=${encodeURIComponent(perfil)}`
        );
        return;
    }

    if (sessao.perfil !== perfil) {
        window.location.replace(
            `../acesso/login.html?perfil=${encodeURIComponent(perfil)}`
        );
    }
})();
