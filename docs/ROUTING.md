# Roteamento no GitHub Pages

Este documento explica como o roteamento de Single Page Application (SPA) funciona no GitHub Pages.

## 🎯 Problema

GitHub Pages é um servidor de arquivos estáticos que não tem suporte nativo para roteamento de SPAs. Quando você acessa diretamente uma rota como `/meus-dados`, o servidor tenta buscar um arquivo físico em `/meus-dados/index.html` e retorna 404.

### Exemplo do problema:
- ✅ `diariosdoclima.org.br` → Funciona (carrega index.html)
- ❌ `diariosdoclima.org.br/meus-dados` → Erro 404 (tenta buscar arquivo físico)
- ✅ Navegar de `/` para `/meus-dados` → Funciona (roteamento client-side)

## ✅ Solução Implementada

Usamos a técnica do **spa-github-pages** que redireciona todas as rotas 404 para o `index.html` com os parâmetros preservados.

### Como funciona:

1. **404.html** - Quando alguém acessa uma rota que não existe fisicamente:
   - O GitHub Pages serve o arquivo `404.html`
   - Um script converte a URL em query string
   - Redireciona para `index.html` com os dados da rota

2. **index.html** - No carregamento da página:
   - Um script verifica se há dados de redirecionamento
   - Restaura a URL original usando `history.replaceState`
   - O React Router processa a rota normalmente

### Exemplo de fluxo:

```
Usuário acessa: diariosdoclima.org.br/meus-dados
       ↓
GitHub Pages: Não encontra arquivo físico → Serve 404.html
       ↓
Script 404.html: Redireciona para /?/meus-dados
       ↓
index.html carrega: Script restaura URL para /meus-dados
       ↓
React Router: Renderiza componente UserInfo
```

## 📁 Arquivos Modificados

### public/404.html
```html
<!-- Redireciona todas as rotas 404 para index.html -->
<script>
  // Converte /rota para /?/rota e redireciona
  var l = window.location;
  l.replace(...);
</script>
```

### public/index.html
```html
<script>
  // Restaura a URL original quando vem de 404.html
  (function(l) {
    if (l.search[1] === '/' ) {
      // Decodifica e restaura a rota
      window.history.replaceState(null, null, decoded);
    }
  }(window.location))
</script>
```

## 🧪 Testando Localmente

### Simular comportamento do GitHub Pages:

```bash
# Build do projeto
npm run build

# Servir com fallback para index.html
npx serve -s dist
```

### Testar rotas diretas:

1. Acesse: `http://localhost:3000/meus-dados`
2. Recarregue a página (F5)
3. A rota deve continuar funcionando

## 🌐 Rotas Disponíveis

Todas essas rotas funcionam tanto para navegação quanto para acesso direto:

- `/` - Home
- `/cadastro` - Cadastro
- `/seja-pro` - Planos profissionais
- `/iniciar-busca` - Iniciar busca
- `/termos` - Termos de uso
- `/sobre` - Sobre
- `/relatorios` - Relatórios públicos
- `/comprar` - Compra
- `/planos` - Planos
- `/busca` - Busca
- `/meus-relatorios` - Relatórios do usuário (requer login)
- `/meus-alertas` - Alertas do usuário (requer login)
- `/meus-dados` - Dados do usuário (requer login)
- `/cnpjs` - Página de CNPJs
- `/definir-senha` - Definir nova senha

## ⚠️ Limitações

### 1. Pequeno delay no carregamento
- Há um redirecionamento extra do 404.html para index.html
- O delay é mínimo (< 100ms) e não afeta a experiência

### 2. URLs ficam na query string momentaneamente
- Durante o redirecionamento, a URL fica como `/?/meus-dados`
- O script restaura imediatamente para `/meus-dados`

### 3. SEO
- Mecanismos de busca podem ter dificuldade com essa técnica
- Considere usar SSR (Server-Side Rendering) para SEO crítico

## 🔄 Alternativas

### Se precisar de melhor SEO ou performance:

1. **Netlify** - Tem suporte nativo a SPAs com `_redirects`:
   ```
   /* /index.html 200
   ```

2. **Vercel** - Configuração automática para SPAs

3. **AWS S3 + CloudFront** - Configurar error pages customizadas

4. **Next.js ou Gatsby** - SSR/SSG com rotas pré-renderizadas

## 🐛 Troubleshooting

### Rota retorna 404 após deploy

1. Verifique se `404.html` está na pasta `dist/` após o build
2. Confirme que o arquivo está sendo enviado ao GitHub Pages
3. Limpe o cache do browser (Ctrl+Shift+R)

### URL não é restaurada corretamente

1. Verifique o console do browser para erros JavaScript
2. Confirme que o script em `index.html` está sendo executado
3. Teste em modo anônimo para evitar cache

### Rota funciona localmente mas não no GitHub Pages

1. Aguarde alguns minutos para propagação do deploy
2. Verifique se o DNS está apontando corretamente
3. Teste com `curl -I https://diariosdoclima.org.br/meus-dados`

## 📚 Referências

- [spa-github-pages](https://github.com/rafgraph/spa-github-pages)
- [React Router GitHub Pages](https://create-react-app.dev/docs/deployment/#github-pages)
- [GitHub Pages Documentation](https://docs.github.com/pages)

## ✅ Checklist de Verificação

Após o deploy, teste:

- [ ] Página inicial carrega: `/`
- [ ] Rota direta funciona: `/meus-dados`
- [ ] Recarregar página mantém rota: F5 em `/meus-dados`
- [ ] Navegação interna funciona: Clicar em links
- [ ] Back/Forward do browser funciona
- [ ] URLs não têm `?/` permanentemente
- [ ] Rotas protegidas redirecionam para login corretamente

## 🎓 Como Funciona Tecnicamente

### Fluxo detalhado:

```
1. GET /meus-dados
   └─> GitHub Pages: Arquivo não existe
       └─> Retorna 404.html (HTTP 404)

2. 404.html executa script:
   var path = "/meus-dados"
   window.location.replace("/?/meus-dados")
   └─> Browser redireciona (client-side)

3. GET /?/meus-dados
   └─> GitHub Pages: Serve index.html (HTTP 200)

4. index.html executa script:
   if (location.search[1] === '/') {
     history.replaceState(null, null, "/meus-dados")
   }
   └─> URL exibida: /meus-dados (sem recarregar)

5. React Router:
   <Route path="/meus-dados" element={<UserInfo />} />
   └─> Renderiza componente correto
```

### Por que isso funciona:

- `history.replaceState()` muda a URL sem recarregar
- O estado do browser é atualizado antes do React carregar
- React Router lê a URL atualizada e renderiza a rota correta
- Não há flash de conteúdo ou URL visível incorreta

---

**Nota**: Esta solução é um workaround necessário para GitHub Pages. Para aplicações em produção com requisitos de SEO ou performance críticos, considere usar plataformas com suporte nativo a SPAs ou implementar SSR.
