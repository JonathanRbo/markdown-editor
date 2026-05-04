(function () {
  'use strict';

  const STORAGE_KEY = 'md-editor:content';
  const THEME_KEY = 'md-editor:theme';
  const HLJS_THEME_LIGHT = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css';
  const HLJS_THEME_DARK = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css';
  const MOBILE_QUERY = '(max-width: 768px)';
  const WELCOME_TEMPLATE_ID = 'project';

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const editor = $('#editor');
  const preview = $('#preview');
  const savedStat = $('#stat-saved');
  const wordsStat = $('#stat-words');
  const charsStat = $('#stat-chars');
  const readStat = $('#stat-read');
  const modal = $('#modal-templates');
  const templatesGrid = $('#templates-grid');
  const resizer = $('#resizer');
  const workspace = $('.workspace');

  const safeStorage = {
    get(key) {
      try { return localStorage.getItem(key); } catch { return null; }
    },
    set(key, value) {
      try { localStorage.setItem(key, value); return true; } catch { return false; }
    }
  };

  const pluralize = (n, sing, plur) => `${n} ${n === 1 ? sing : plur}`;

  function configureMarked() {
    if (typeof marked === 'undefined') return;
    marked.setOptions({
      gfm: true,
      breaks: true,
      highlight(code, lang) {
        if (typeof hljs === 'undefined') return code;
        const language = lang && hljs.getLanguage(lang) ? lang : null;
        try {
          return language
            ? hljs.highlight(code, { language }).value
            : hljs.highlightAuto(code).value;
        } catch {
          return code;
        }
      }
    });
  }

  function render() {
    const text = editor.value;
    if (typeof marked !== 'undefined') {
      preview.innerHTML = marked.parse(text);
      preview.querySelectorAll('a[href^="http"]').forEach((a) => {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      });
    } else {
      preview.textContent = text;
    }
    updateStats(text);
  }

  function updateStats(text) {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const minutes = Math.max(1, Math.round(words / 200));
    wordsStat.textContent = pluralize(words, 'palavra', 'palavras');
    charsStat.textContent = pluralize(text.length, 'caractere', 'caracteres');
    readStat.textContent = `${minutes} min de leitura`;
  }

  let renderScheduled = false;
  function scheduleRender() {
    if (renderScheduled) return;
    renderScheduled = true;
    requestAnimationFrame(() => {
      renderScheduled = false;
      render();
    });
  }

  let saveTimer;
  function scheduleSave() {
    setSaveState('Salvando...', false);
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      const ok = safeStorage.set(STORAGE_KEY, editor.value);
      setSaveState(ok ? 'Salvo' : 'Erro ao salvar', ok);
    }, 500);
  }

  function setSaveState(label, saved) {
    savedStat.textContent = label;
    savedStat.classList.toggle('saved', saved);
    savedStat.classList.toggle('unsaved', !saved);
  }

  function applyEdit(newValue, caretStart, caretEnd) {
    editor.value = newValue;
    editor.setSelectionRange(caretStart, caretEnd ?? caretStart);
    editor.focus();
    onInput();
  }

  function wrapSelection(prefix, suffix, placeholder) {
    suffix = suffix === undefined ? prefix : suffix;
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const selected = editor.value.slice(start, end) || (placeholder || '');
    const newValue = editor.value.slice(0, start) + prefix + selected + suffix + editor.value.slice(end);
    const newStart = start + prefix.length;
    applyEdit(newValue, newStart, newStart + selected.length);
  }

  function insertAtLineStart(prefix) {
    const start = editor.selectionStart;
    const value = editor.value;
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    applyEdit(
      value.slice(0, lineStart) + prefix + value.slice(lineStart),
      start + prefix.length
    );
  }

  function paddingBefore(text) {
    if (!text) return '';
    if (text.endsWith('\n\n')) return '';
    return text.endsWith('\n') ? '\n' : '\n\n';
  }

  function insertBlock(text) {
    const start = editor.selectionStart;
    const before = editor.value.slice(0, start);
    const after = editor.value.slice(editor.selectionEnd);
    const padBefore = paddingBefore(before);
    const padAfter = after && !after.startsWith('\n') ? '\n' : '';
    const newValue = before + padBefore + text + padAfter + after;
    applyEdit(newValue, (before + padBefore + text).length);
  }

  const TOOLBAR_ACTIONS = {
    bold: () => wrapSelection('**', '**', 'texto em negrito'),
    italic: () => wrapSelection('*', '*', 'texto em itálico'),
    strike: () => wrapSelection('~~', '~~', 'texto riscado'),
    h1: () => insertAtLineStart('# '),
    h2: () => insertAtLineStart('## '),
    h3: () => insertAtLineStart('### '),
    ul: () => insertAtLineStart('- '),
    ol: () => insertAtLineStart('1. '),
    check: () => insertAtLineStart('- [ ] '),
    link: () => {
      const url = prompt('URL do link:', 'https://');
      if (url === null) return;
      wrapSelection('[', `](${url || 'https://'})`, 'texto do link');
    },
    image: () => {
      const url = prompt('URL da imagem:', 'https://');
      if (url === null) return;
      const alt = prompt('Texto alternativo:', '') || 'imagem';
      insertBlock(`![${alt}](${url})`);
    },
    code: () => wrapSelection('`', '`', 'código'),
    codeblock: () => insertBlock('```js\n// seu código aqui\n```'),
    quote: () => insertAtLineStart('> '),
    table: () => insertBlock(
      '| Coluna 1 | Coluna 2 | Coluna 3 |\n' +
      '|----------|----------|----------|\n' +
      '| Linha 1  | Linha 1  | Linha 1  |\n' +
      '| Linha 2  | Linha 2  | Linha 2  |'
    ),
    hr: () => insertBlock('---')
  };

  $$('#toolbar button[data-md]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const fn = TOOLBAR_ACTIONS[btn.dataset.md];
      if (fn) fn();
    });
  });

  editor.addEventListener('keydown', (e) => {
    const ctrl = e.ctrlKey || e.metaKey;
    if (!ctrl) {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        applyEdit(
          editor.value.slice(0, start) + '  ' + editor.value.slice(end),
          start + 2
        );
      }
      return;
    }
    const key = e.key.toLowerCase();
    if (key === 'b') { e.preventDefault(); TOOLBAR_ACTIONS.bold(); }
    else if (key === 'i') { e.preventDefault(); TOOLBAR_ACTIONS.italic(); }
    else if (key === 'k') { e.preventDefault(); TOOLBAR_ACTIONS.link(); }
    else if (key === 's') { e.preventDefault(); exportFile('md'); }
  });

  function onInput() {
    scheduleRender();
    scheduleSave();
  }
  editor.addEventListener('input', onInput);

  let scrollScheduled = false;
  editor.addEventListener('scroll', () => {
    if (scrollScheduled) return;
    scrollScheduled = true;
    requestAnimationFrame(() => {
      scrollScheduled = false;
      const editorRange = editor.scrollHeight - editor.clientHeight;
      const previewRange = preview.scrollHeight - preview.clientHeight;
      if (editorRange <= 0 || previewRange <= 0) return;
      preview.scrollTop = (editor.scrollTop / editorRange) * previewRange;
    });
  });

  function applyTheme(theme) {
    document.body.dataset.theme = theme;
    const link = $('#hljs-theme');
    if (link) link.href = theme === 'dark' ? HLJS_THEME_DARK : HLJS_THEME_LIGHT;
    const icon = $('.theme-icon');
    if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    safeStorage.set(THEME_KEY, theme);
  }

  $('#btn-theme').addEventListener('click', () => {
    applyTheme(document.body.dataset.theme === 'dark' ? 'light' : 'dark');
  });

  function loadTheme() {
    const saved = safeStorage.get(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return applyTheme(saved);
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    applyTheme(prefersLight ? 'light' : 'dark');
  }

  function buildTemplatesGrid() {
    if (!Array.isArray(window.MD_TEMPLATES)) return;
    templatesGrid.innerHTML = '';
    window.MD_TEMPLATES.forEach((tpl) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'template-card';

      const icon = document.createElement('span');
      icon.className = 'icon';
      icon.textContent = tpl.icon;

      const name = document.createElement('div');
      name.className = 'name';
      name.textContent = tpl.name;

      const desc = document.createElement('div');
      desc.className = 'desc';
      desc.textContent = tpl.desc;

      card.append(icon, name, desc);
      card.addEventListener('click', () => {
        if (!replaceContent(tpl.content, 'Substituir o conteúdo atual pelo template?')) return;
        closeModal();
        toast(`Template "${tpl.name}" carregado`);
      });
      templatesGrid.appendChild(card);
    });
  }

  function replaceContent(text, confirmMsg) {
    if (editor.value.trim() && confirmMsg && !confirm(confirmMsg)) return false;
    editor.value = text;
    onInput();
    return true;
  }

  let lastFocusedBeforeModal = null;
  function openModal() {
    lastFocusedBeforeModal = document.activeElement;
    modal.hidden = false;
    const firstCard = templatesGrid.querySelector('.template-card');
    if (firstCard) firstCard.focus();
  }

  function closeModal() {
    modal.hidden = true;
    if (lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus === 'function') {
      lastFocusedBeforeModal.focus();
    }
  }

  $('#btn-templates').addEventListener('click', openModal);
  modal.addEventListener('click', (e) => {
    if (e.target.hasAttribute('data-close')) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!modal.hidden) {
      closeModal();
    } else if (document.body.classList.contains('focus-mode')) {
      document.body.classList.remove('focus-mode');
    }
  });

  $('#btn-import').addEventListener('click', () => $('#file-input').click());
  $('#file-input').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) readFile(file);
    e.target.value = '';
  });

  function readFile(file) {
    if (editor.value.trim() && !confirm('Substituir o conteúdo atual?')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      editor.value = e.target.result;
      onInput();
      toast(`"${file.name}" carregado`);
    };
    reader.readAsText(file);
  }

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((evt) => {
    editor.addEventListener(evt, (e) => {
      e.preventDefault();
      const active = evt === 'dragenter' || evt === 'dragover';
      editor.classList.toggle('drop-active', active);
    });
  });
  editor.addEventListener('drop', (e) => {
    const file = e.dataTransfer.files[0];
    if (file && /\.(md|markdown|txt)$/i.test(file.name)) readFile(file);
  });

  const EXPORTS = {
    md: { filename: 'documento.md', mime: 'text/markdown', build: (md) => md },
    html: { filename: 'documento.html', mime: 'text/html', build: buildHTMLDocument }
  };

  function exportFile(type) {
    const md = editor.value;
    if (!md.trim()) {
      toast('Nada para exportar');
      return;
    }
    if (type === 'pdf') {
      if (printPDF(md)) toast('Exportado como .pdf');
      return;
    }
    const cfg = EXPORTS[type];
    if (!cfg) return;
    download(cfg.build(md), cfg.filename, cfg.mime);
    toast(`Exportado como .${type}`);
  }

  function buildHTMLDocument(md) {
    const body = (typeof marked !== 'undefined') ? marked.parse(md) : md;
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Documento</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; line-height: 1.6; color: #1f2328; }
  h1, h2 { border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; }
  code { background: #f6f8fa; padding: 0.2em 0.4em; border-radius: 4px; font-size: 85%; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
  pre { background: #f6f8fa; padding: 16px; border-radius: 6px; overflow-x: auto; }
  pre code { background: none; padding: 0; }
  blockquote { border-left: 4px solid #dfe2e5; padding: 0 1em; color: #6a737d; margin-left: 0; }
  table { border-collapse: collapse; width: 100%; }
  th, td { border: 1px solid #dfe2e5; padding: 8px 13px; }
  th { background: #f6f8fa; }
  img { max-width: 100%; }
  a { color: #0969da; }
</style>
</head>
<body>
${body}
</body>
</html>`;
  }

  function printPDF(md) {
    const w = window.open('', '_blank');
    if (!w) {
      toast('Permita popups para exportar PDF');
      return false;
    }
    w.document.write(buildHTMLDocument(md));
    w.document.close();
    w.onload = () => w.print();
    return true;
  }

  function download(content, filename, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  $$('[data-export]').forEach((btn) => {
    btn.addEventListener('click', () => exportFile(btn.dataset.export));
  });

  $('#btn-clear').addEventListener('click', () => {
    if (!editor.value.trim()) return;
    if (confirm('Limpar todo o conteúdo? Essa ação não pode ser desfeita.')) {
      editor.value = '';
      onInput();
      toast('Conteúdo limpo');
    }
  });

  $('#btn-fullscreen').addEventListener('click', () => {
    document.body.classList.toggle('focus-mode');
    editor.focus();
  });

  let resizeState = null;

  resizer.addEventListener('mousedown', (e) => {
    e.preventDefault();
    const isMobile = window.matchMedia(MOBILE_QUERY).matches;
    resizeState = {
      isMobile,
      rect: workspace.getBoundingClientRect(),
      coordKey: isMobile ? 'clientY' : 'clientX',
      startKey: isMobile ? 'top' : 'left',
      sizeKey: isMobile ? 'height' : 'width',
      gridProp: isMobile ? 'gridTemplateRows' : 'gridTemplateColumns'
    };
    resizer.classList.add('active');
    document.body.style.cursor = isMobile ? 'row-resize' : 'col-resize';
    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', onResizeMove);
    document.addEventListener('mouseup', onResizeEnd);
  });

  let resizeFrameScheduled = false;
  let lastResizeEvent = null;
  function onResizeMove(e) {
    lastResizeEvent = e;
    if (resizeFrameScheduled) return;
    resizeFrameScheduled = true;
    requestAnimationFrame(() => {
      resizeFrameScheduled = false;
      if (!resizeState || !lastResizeEvent) return;
      const { rect, coordKey, startKey, sizeKey, gridProp } = resizeState;
      const ratio = (lastResizeEvent[coordKey] - rect[startKey]) / rect[sizeKey];
      const clamped = Math.max(0.15, Math.min(0.85, ratio));
      workspace.style[gridProp] = `${clamped}fr 6px ${1 - clamped}fr`;
    });
  }

  function onResizeEnd() {
    resizeState = null;
    lastResizeEvent = null;
    resizer.classList.remove('active');
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    document.removeEventListener('mousemove', onResizeMove);
    document.removeEventListener('mouseup', onResizeEnd);
  }

  let toastTimer;
  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.hidden = true; }, 2000);
  }

  function init() {
    configureMarked();
    loadTheme();
    buildTemplatesGrid();

    const saved = safeStorage.get(STORAGE_KEY);
    if (saved) {
      editor.value = saved;
    } else if (Array.isArray(window.MD_TEMPLATES)) {
      const welcome = window.MD_TEMPLATES.find((t) => t.id === WELCOME_TEMPLATE_ID);
      if (welcome) editor.value = welcome.content;
    }
    render();
    setSaveState('Salvo', true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
