
document.querySelectorAll(".perfil[data-role]").forEach(botao => {
  botao.addEventListener("click", () => {
    const perfil = encodeURIComponent(botao.dataset.role);
    window.location.href = `login.html?perfil=${perfil}`;
  });
});

const botaoNovoCadastro = document.getElementById("botaoNovoCadastro");

if (botaoNovoCadastro) {
  botaoNovoCadastro.addEventListener("click", () => {
    window.location.href = "cadastro.html";
  });
}
