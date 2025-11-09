# Deploy no GitHub Pages

Este projeto está configurado para fazer deploy automático no GitHub Pages usando GitHub Actions com domínio customizado.

## 🌐 Domínio Customizado

**Domínios configurados:**
- `diariosdoclima.org.br` (principal)
- `www.diariosdoclima.org.br` (redirecionamento)

## 🚀 Configuração Inicial

### 1. Configurar DNS do Domínio

Configure os seguintes registros DNS no seu provedor:

#### Registro A (apex domain)
```
Type: A
Name: @
Value: 185.199.108.153
TTL: 3600
```

```
Type: A
Name: @
Value: 185.199.109.153
TTL: 3600
```

```
Type: A
Name: @
Value: 185.199.110.153
TTL: 3600
```

```
Type: A
Name: @
Value: 185.199.111.153
TTL: 3600
```

#### Registro CNAME (www subdomain)
```
Type: CNAME
Name: www
Value: diariosdoclima.org.br
TTL: 3600
```

**Nota**: O registro CNAME do `www` deve apontar para o domínio apex (`diariosdoclima.org.br`), que por sua vez aponta para os IPs do GitHub Pages através dos registros A.

### 2. Habilitar GitHub Pages no Repositório

1. Acesse o repositório no GitHub: https://github.com/okfn-brasil/diarios-do-clima-frontend
2. Vá em **Settings** → **Pages**
3. Em **Source**, selecione: **GitHub Actions**
4. Em **Custom domain**, digite: `diariosdoclima.org.br`
5. Aguarde a verificação do DNS (pode levar alguns minutos)
6. Marque a opção: ✅ **Enforce HTTPS** (após verificação do DNS)
7. Salve as configurações

### 3. Configurar Permissões do Workflow

1. Em **Settings** → **Actions** → **General**
2. Em **Workflow permissions**, certifique-se de que está selecionado:
   - ✅ **Read and write permissions**
3. Salve se precisar alterar

## 📦 Como Funciona

### Deploy Automático

O deploy acontece automaticamente quando você:
- Faz push na branch `main`
- Ou dispara manualmente via **Actions** → **Deploy to GitHub Pages** → **Run workflow**

### Processo de Build

1. **Checkout** do código
2. **Instalação** das dependências (Node.js 14.17.0)
3. **Build** da aplicação (gera pasta `dist/`)
4. **Criação do arquivo CNAME** com o domínio customizado
5. **Upload** dos arquivos estáticos
6. **Deploy** no GitHub Pages

### URLs de Acesso

Após o deploy e configuração do DNS:
- **Produção**: https://diariosdoclima.org.br
- **WWW**: https://www.diariosdoclima.org.br (redirecionamento automático)
- **Fallback**: https://okfn-brasil.github.io/diarios-do-clima-frontend/

## 🔧 Estrutura do Workflow

```
.github/
└── workflows/
    └── deploy-gh-pages.yml  # Workflow de CI/CD
```

### Jobs do Workflow

- **build**: Compila a aplicação React e cria o arquivo CNAME
- **deploy**: Publica no GitHub Pages

## 📝 Arquivo CNAME

O arquivo `CNAME` na raiz do projeto contém o domínio customizado:
```
diariosdoclima.org.br
```

O workflow copia este arquivo para a pasta `dist/` durante o build, garantindo que o domínio customizado seja preservado após cada deploy.

## 🔀 Roteamento de SPA

Este projeto é uma Single Page Application (SPA) usando React Router. O GitHub Pages não tem suporte nativo para roteamento de SPAs, então implementamos uma solução com `404.html`:

- Todas as rotas (ex: `/meus-dados`, `/sobre`, etc) funcionam tanto para navegação quanto para acesso direto
- O arquivo `404.html` redireciona rotas não encontradas para o `index.html`
- Um script no `index.html` restaura a URL original

**Documentação completa**: Ver [docs/ROUTING.md](./docs/ROUTING.md)

### Rotas testadas:
- ✅ `/` - Home
- ✅ `/meus-dados` - Área do usuário
- ✅ `/busca` - Busca
- ✅ Todas as outras rotas da aplicação

## 🔍 Monitoramento

### Ver Status do Deploy

1. Acesse a aba **Actions** no repositório
2. Veja o status do workflow **Deploy to GitHub Pages**
3. Clique no workflow para ver logs detalhados

### Verificar DNS

```bash
# Verificar registro A
dig diariosdoclima.org.br +short

# Verificar registro CNAME
dig www.diariosdoclima.org.br +short

# Verificar HTTPS
curl -I https://diariosdoclima.org.br
```

### Verificar Deploy

Após conclusão bem-sucedida:
- ✅ Badge verde no workflow
- 🌐 Acesse: https://diariosdoclima.org.br
- 🌐 Teste: https://www.diariosdoclima.org.br

## 🛠️ Build Local

Para testar o build localmente:

```bash
# Instalar dependências
npm ci

# Build
npm run build

# Servir localmente
npx serve -s dist
```

## ⚙️ Customização

### Mudar Branch de Deploy

Edite `.github/workflows/deploy-gh-pages.yml`:

```yaml
on:
  push:
    branches:
      - main  # Altere para sua branch
```

### Mudar Domínio

1. Edite o arquivo `CNAME`:
   ```
   seunovodominio.com.br
   ```

2. Configure os registros DNS conforme acima

3. Atualize no GitHub Settings → Pages → Custom domain

### Deploy Manual

No GitHub:
1. **Actions** → **Deploy to GitHub Pages**
2. **Run workflow** → Selecione a branch
3. **Run workflow**

## 🐛 Troubleshooting

### DNS não propaga

- Aguarde até 48 horas (geralmente 10-30 minutos)
- Use `dig` ou https://dnschecker.org para verificar
- Limpe o cache DNS local: `sudo systemd-resolve --flush-caches`

### HTTPS não disponível

1. Aguarde a verificação do DNS completar
2. Em Settings → Pages, desmarque e marque novamente "Enforce HTTPS"
3. Aguarde o certificado SSL ser emitido (pode levar até 24h)

### Domínio não funciona após deploy

1. Verifique se o arquivo CNAME está presente em `dist/` após o build
2. Confirme que o workflow criou o CNAME corretamente (veja logs)
3. Redefina o domínio em Settings → Pages

### Erro "Domain's DNS record could not be retrieved"

- Confirme que os registros A estão apontando para os IPs corretos do GitHub
- Use `dig diariosdoclima.org.br` para verificar

### Deploy falhou

1. Verifique os logs em **Actions**
2. Confirme que as permissões estão corretas
3. Verifique se o GitHub Pages está habilitado

## 📚 Recursos

- [GitHub Pages Custom Domain](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [GitHub Pages Documentation](https://docs.github.com/pages)
- [GitHub Actions Documentation](https://docs.github.com/actions)
- [DNS Checker](https://dnschecker.org)

## 🔄 Alterações Realizadas

### Arquivos Criados/Modificados

1. **`.github/workflows/deploy-gh-pages.yml`** - Workflow com suporte a domínio customizado
2. **`webpack.config.js`** - publicPath em `/` (raiz)
3. **`CNAME`** - Arquivo com domínio customizado
4. **`DEPLOY.md`** - Esta documentação
5. **`.gitignore`** - Adicionado .gh-pages

## ✅ Checklist de Configuração

- [ ] Registros DNS configurados (4x A + 1x CNAME)
- [ ] GitHub Pages habilitado (Source: GitHub Actions)
- [ ] Domínio customizado adicionado no GitHub
- [ ] DNS verificado (pode levar alguns minutos)
- [ ] HTTPS habilitado (Enforce HTTPS marcado)
- [ ] Primeiro deploy realizado com sucesso
- [ ] Domínio acessível via HTTPS
- [ ] WWW redirecionando corretamente

## 🔐 Segurança

### HTTPS/SSL

O GitHub Pages fornece certificado SSL gratuito via Let's Encrypt automaticamente após:
1. DNS verificado
2. "Enforce HTTPS" habilitado

### HSTS

O GitHub Pages já inclui headers de segurança. Para verificar:
```bash
curl -I https://diariosdoclima.org.br | grep -i strict
```

---

**Nota**: 
- A propagação DNS pode levar de 10 minutos a 48 horas
- O certificado SSL é emitido automaticamente pelo GitHub após verificação do DNS
- O primeiro deploy pode levar alguns minutos

