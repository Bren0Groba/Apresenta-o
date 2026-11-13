# Breno Portfolio — versão com Estudos e Cursos

Projeto React + Vite, sem backend, com dados mockados e estilos separados por seção.

## Executar

Requer Node.js 18+. Abra a pasta `breno-portfolio` no terminal:

```bash
npm install
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
```

## Personalizar

Edite `src/data/portfolio.js` para ajustar seu perfil, contatos, projetos, experiências e cursos. Os cursos são exemplos e não comprovam certificados.

## Estrutura

- `src/App.jsx`: componentes e interações
- `src/data/portfolio.js`: conteúdo mockado
- `src/styles/`: CSS separado por área, inclusive `studies.css`
- `vite.config.js`: plugin React para Vite
- `public/favicon.svg`: ícone do site

## Melhorias desta versão

- Animações de entrada com IntersectionObserver (sem dependências extras).
- Efeito 3D com iluminação dinâmica nos cards de projetos, somente em dispositivos com ponteiro.
- Movimento sutil na ilustração principal e respeito a `prefers-reduced-motion`.
- Tema salvo no navegador, com fallback seguro quando armazenamento não está disponível.
- Foco contido no modal e na busca rápida durante a interação com teclado.
- Rótulos acessíveis para filtros e botões; navegação reduz movimento quando solicitado.
- Metadados básicos de compartilhamento.
- CSS adicional isolado em `src/styles/polish.css`.

## Antes de publicar

1. Substitua `seuemail@email.com` em `src/data/portfolio.js` por um endereço real.
2. Revise as descrições, os links de cada projeto e o status dos cursos mockados.
3. Rode `npm install` e `npm run build` no seu computador.
4. Teste o site em telas pequenas e com navegação por teclado.

**Validação:** arquivos JavaScript e JSX analisados com o parser Babel sem erros de sintaxe. O build de produção não foi confirmado porque `npm ci` excedeu o tempo disponível no ambiente de execução.
