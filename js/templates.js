window.MD_TEMPLATES = [
  {
    id: 'blank',
    icon: '📄',
    name: 'Em branco',
    desc: 'Comece do zero',
    content: ''
  },
  {
    id: 'simple',
    icon: '📝',
    name: 'Básico',
    desc: 'Título, descrição e seções essenciais',
    content: `# Nome do Projeto

> Uma breve descrição do que esse projeto faz e para quem é.

## Instalação

\`\`\`bash
npm install nome-do-projeto
\`\`\`

## Uso

\`\`\`js
import { algo } from 'nome-do-projeto';
algo();
\`\`\`

## Licença

[MIT](LICENSE)
`
  },
  {
    id: 'project',
    icon: '🚀',
    name: 'Projeto Completo',
    desc: 'Estrutura padrão de README de projeto open source',
    content: `# Nome do Projeto

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)]()

Uma descrição curta e poderosa que explica em uma frase o que o projeto faz.

![Demo](https://via.placeholder.com/800x400?text=Screenshot+do+Projeto)

## ✨ Funcionalidades

- 🚀 Funcionalidade incrível #1
- 💡 Funcionalidade útil #2
- 🎨 Interface bonita e moderna
- 📱 Totalmente responsivo
- 🔒 Seguro e confiável

## 📦 Instalação

\`\`\`bash
git clone https://github.com/usuario/projeto.git
cd projeto
npm install
\`\`\`

## 🚀 Como usar

\`\`\`js
const projeto = require('projeto');

projeto.fazerAlgoIncrivel({
  opcao: 'valor',
});
\`\`\`

## ⚙️ Configuração

| Opção    | Tipo     | Padrão    | Descrição                |
|----------|----------|-----------|--------------------------|
| \`opcao\`  | string   | \`'auto'\` | Define o modo de operação |
| \`debug\`  | boolean  | \`false\`  | Ativa logs detalhados     |

## 🤝 Contribuindo

Contribuições são bem-vindas! Para grandes mudanças, abra uma issue antes para discutir o que você gostaria de mudar.

1. Faça um fork do projeto
2. Crie uma branch (\`git checkout -b feature/MinhaFeature\`)
3. Commit suas mudanças (\`git commit -m 'Add: MinhaFeature'\`)
4. Push para a branch (\`git push origin feature/MinhaFeature\`)
5. Abra um Pull Request

## 📝 Licença

Distribuído sob a licença MIT. Veja \`LICENSE\` para mais informações.

## 📬 Contato

Seu Nome - [@seu_twitter](https://twitter.com/seu_twitter) - email@exemplo.com

Link do Projeto: [https://github.com/usuario/projeto](https://github.com/usuario/projeto)
`
  },
  {
    id: 'profile',
    icon: '👤',
    name: 'Perfil GitHub',
    desc: 'README do seu perfil pessoal',
    content: `# 👋 Olá, eu sou o [Seu Nome]!

<div align="center">

![Profile Views](https://komarev.com/ghpvc/?username=seu-usuario&color=blueviolet)

</div>

## 🚀 Sobre Mim

Sou um(a) **desenvolvedor(a) Full Stack** apaixonado(a) por criar soluções digitais que fazem a diferença. Atualmente focado(a) em [tecnologia/área].

- 🔭 Trabalhando em: **[Projeto Atual]**
- 🌱 Aprendendo: **[Tecnologia que está estudando]**
- 💬 Pergunte-me sobre: **JavaScript, React, Node.js**
- 📫 Como me encontrar: **email@exemplo.com**

## 💻 Tecnologias

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

## 📊 Estatísticas

<p align="center">
  <img width="48%" src="https://github-readme-stats.vercel.app/api?username=seu-usuario&show_icons=true&theme=tokyonight" />
  <img width="48%" src="https://github-readme-stats.vercel.app/api/top-langs/?username=seu-usuario&layout=compact&theme=tokyonight" />
</p>

## 🌐 Conecte-se comigo

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/seu-usuario)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/seu-usuario)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/seu-usuario)

---

⭐️ **De [Seu Nome](https://github.com/seu-usuario)**
`
  },
  {
    id: 'minimal',
    icon: '✨',
    name: 'Minimalista',
    desc: 'Curto, direto e elegante',
    content: `# nome-do-projeto

Descrição em uma frase.

\`\`\`bash
npm install nome-do-projeto
\`\`\`

\`\`\`js
import projeto from 'nome-do-projeto';
projeto();
\`\`\`

[Documentação](#) · [Issues](#) · [Licença MIT](LICENSE)
`
  },
  {
    id: 'api',
    icon: '🔌',
    name: 'API / Biblioteca',
    desc: 'Documentação para SDK ou API',
    content: `# Nome da API

Cliente oficial para a [API do Serviço].

## Instalação

\`\`\`bash
npm install nome-api
\`\`\`

## Autenticação

\`\`\`js
import { Cliente } from 'nome-api';

const cliente = new Cliente({
  apiKey: process.env.API_KEY,
});
\`\`\`

## Métodos

### \`cliente.get(id)\`

Busca um recurso pelo ID.

**Parâmetros:**
- \`id\` (string) — Identificador do recurso

**Retorna:** \`Promise<Recurso>\`

**Exemplo:**

\`\`\`js
const recurso = await cliente.get('123');
console.log(recurso.nome);
\`\`\`

### \`cliente.list(opcoes)\`

Lista todos os recursos.

**Parâmetros:**
- \`opcoes.limite\` (number) — Quantidade máxima (padrão: 20)
- \`opcoes.pagina\` (number) — Número da página

**Retorna:** \`Promise<Recurso[]>\`

## Tratamento de erros

\`\`\`js
try {
  const recurso = await cliente.get('123');
} catch (erro) {
  if (erro.codigo === 'NAO_ENCONTRADO') {
    console.error('Recurso não existe');
  }
}
\`\`\`

## Licença

MIT
`
  },
  {
    id: 'changelog',
    icon: '📋',
    name: 'CHANGELOG',
    desc: 'Histórico de versões (Keep a Changelog)',
    content: `# Changelog

Todas as mudanças notáveis deste projeto serão documentadas aqui.

O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/) e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Não lançado]

### Adicionado
- Nova funcionalidade incrível em desenvolvimento

## [1.1.0] - 2025-01-15

### Adicionado
- Suporte a tema escuro
- Atalhos de teclado para ações comuns

### Corrigido
- Bug ao salvar arquivos com caracteres especiais
- Performance no carregamento inicial

### Mudado
- API de configuração simplificada

## [1.0.0] - 2024-11-20

### Adicionado
- Lançamento inicial 🎉
- Funcionalidades básicas
- Documentação completa
`
  },
  {
    id: 'blogpost',
    icon: '📰',
    name: 'Post de Blog',
    desc: 'Estrutura de artigo para Dev.to / Medium',
    content: `---
title: Título do Post Aqui
published: false
description: Descrição que aparece nos previews (até 160 caracteres)
tags: javascript, webdev, tutorial, beginners
cover_image: https://exemplo.com/imagem-de-capa.png
---

## Introdução

Comece com um gancho forte: uma pergunta intrigante, uma estatística surpreendente ou uma promessa clara.

> 💡 **TL;DR:** Resuma em uma frase o que o leitor vai aprender.

## O Problema

Descreva o problema que você está resolvendo. Por que isso importa? Quem se importa?

## A Solução

Apresente sua solução de forma clara.

\`\`\`js
// Exemplo de código
function exemplo() {
  return 'Hello World';
}
\`\`\`

### Passo 1: Configuração

Detalhe o primeiro passo.

### Passo 2: Implementação

Detalhe o segundo passo.

### Passo 3: Teste

Detalhe como testar.

## Conclusão

Recapitule os pontos principais e dê o próximo passo para o leitor.

---

📌 Curtiu? Me siga para mais conteúdo sobre [tema].

🔗 **Links:**
- [Repositório no GitHub](#)
- [Documentação oficial](#)
- [Meu Twitter](#)
`
  }
];
