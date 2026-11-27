# Meu-Mundo
Esse é um projeto criado para o InovaDay da Faculdade Senac-DF. 

## Estrutura do protótipo

- `Front_Meu_Mundo/pages/acesso/`: seleção de perfil, cadastro, login e recuperação demonstrativa.
- `Front_Meu_Mundo/pages/crianca/`: painel infantil.
- `Front_Meu_Mundo/pages/responsavel/`: painel do responsável.
- `Front_Meu_Mundo/pages/profissional/`: painel e lista de pacientes do profissional.
- `Front_Meu_Mundo/pages/clinica/`: painel da clínica.
- `Front_Meu_Mundo/css/` e `Front_Meu_Mundo/JS/`: estilos e scripts compartilhados.

Para executar, inicie um servidor estático na raiz do repositório, por exemplo:

```powershell
python -m http.server 8000
```

Abra `http://localhost:8000/Front_Meu_Mundo/pages/acesso/perfis.html`.

O cadastro, o login e o armazenamento são demonstrativos, baseados em `localStorage` e `sessionStorage`. Não use dados reais: a autenticação e as verificações de perfil no navegador não substituem autorização e segurança no backend.
