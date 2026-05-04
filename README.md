# 📝 Markdown Editor

> Editor de Markdown moderno com preview ao vivo, templates de README e exportação para HTML/PDF. Sem build, sem dependências de instalação — abra o `index.html` e use.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![No Build](https://img.shields.io/badge/no--build-required-success)
![Vanilla JS](https://img.shields.io/badge/vanilla-JS-yellow)

![Preview](https://via.placeholder.com/1200x600/0d1117/2f81f7?text=Markdown+Editor)

## ✨ Funcionalidades

- 🔄 **Preview ao vivo** — split view com sincronização de scroll
- 🛠️ **Toolbar completa** — negrito, itálico, headings, listas, links, código, tabelas
- 📚 **8 templates** prontos — README de projeto, perfil GitHub, CHANGELOG, post de blog, API e mais
- 💾 **Auto-save** no localStorage — nunca perca seu trabalho
- 🌗 **Tema claro e escuro** — segue a preferência do sistema
- ⌨️ **Atalhos de teclado** — `Ctrl+B`, `Ctrl+I`, `Ctrl+K`, `Ctrl+S`
- 📂 **Importar e exportar** — drag & drop de `.md`, exportação para Markdown, HTML e PDF
- 🎯 **Modo foco** — esconde tudo e te deixa só com o texto
- 📊 **Estatísticas** — contagem de palavras, caracteres e tempo de leitura
- 📱 **Mobile responsivo** — layout vertical em telas pequenas
- 🎨 **Syntax highlighting** com `highlight.js` em blocos de código

## 🚀 Como usar

```bash
git clone https://github.com/JonathanRbo/markdown-editor.git
cd markdown-editor
```

Abra o `index.html` no navegador. Pronto.

Ou hospede gratuitamente no **GitHub Pages**:

```bash
# Settings → Pages → branch: main → /root → Save
```

## ⌨️ Atalhos

| Atalho            | Ação              |
|-------------------|-------------------|
| `Ctrl + B`        | Negrito           |
| `Ctrl + I`        | Itálico           |
| `Ctrl + K`        | Inserir link      |
| `Ctrl + S`        | Baixar como `.md` |
| `Tab`             | Indentação (2 espaços) |
| `Esc`             | Sair do modo foco / fechar modal |

## 📚 Templates inclusos

- **Em branco** — comece do zero
- **Básico** — título, descrição e seções essenciais
- **Projeto Completo** — README completo com badges, tabelas e CTAs
- **Perfil GitHub** — README pro seu perfil pessoal
- **Minimalista** — curto, direto e elegante
- **API / Biblioteca** — documentação para SDK ou API
- **CHANGELOG** — histórico de versões (Keep a Changelog)
- **Post de Blog** — estrutura para Dev.to / Medium

## 🏗️ Stack

- **HTML + CSS + JS puro** — sem build step, sem npm install
- [`marked`](https://github.com/markedjs/marked) — parser de Markdown
- [`highlight.js`](https://highlightjs.org/) — syntax highlighting
- Carregados via CDN (jsDelivr / cdnjs)

## 📁 Estrutura

```
markdown-editor/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   └── templates.js
├── README.md
└── LICENSE
```

## 🤝 Contribuindo

Pull requests são bem-vindos. Pra mudanças grandes, abra uma issue antes pra discutir o que você quer mudar.

## 📝 Licença

[MIT](LICENSE) © [Jonathan Ribeiro](https://github.com/JonathanRbo)

---

<div align="center">

Feito com ❤️ e ☕ por [Jonathan Ribeiro](https://github.com/JonathanRbo)

</div>
