# Configuração de API

Este documento descreve como as APIs são configuradas no projeto.

## 📡 APIs Utilizadas

### 1. Backend API (Diários do Clima)
- **URL Padrão**: `https://backend-api.diariosdoclima.org.br/api`
- **Uso**: Autenticação, relatórios, alertas, contas, etc.
- **Variável de ambiente**: `REACT_APP_BACKEND_API`

### 2. Querido Diário API
- **URL Padrão**: `https://api.queridodiario.org.br`
- **Uso**: Consulta de cidades e municípios
- **Variável de ambiente**: `REACT_APP_QUERIDO_DIARIO_API`

## ⚙️ Configuração

### Arquivo de Configuração

As URLs das APIs são centralizadas em `src/config/api.ts`:

```typescript
export const API_CONFIG = {
  BACKEND_API: process.env.REACT_APP_BACKEND_API || 'https://backend-api.diariosdoclima.org.br/api',
  QUERIDO_DIARIO_API: process.env.REACT_APP_QUERIDO_DIARIO_API || 'https://api.queridodiario.org.br',
};
```

### Variáveis de Ambiente

Configure as URLs no arquivo `.env`:

```bash
# Backend API
REACT_APP_BACKEND_API=https://backend-api.diariosdoclima.org.br/api

# Querido Diário API
REACT_APP_QUERIDO_DIARIO_API=https://api.queridodiario.org.br
```

### Para Desenvolvimento Local

Se você estiver rodando as APIs localmente, ajuste o `.env`:

```bash
# Backend API local
REACT_APP_BACKEND_API=http://localhost:8000/api

# Querido Diário API local
REACT_APP_QUERIDO_DIARIO_API=http://localhost:3001
```

## 🔄 Mudança Importante

### Antes (incorreto)
```
queridodiario.org.br/api/cities
```

### Agora (correto)
```
api.queridodiario.org.br/cities
```

A mudança foi feita para:
- ✅ Usar subdomínio ao invés de path (`/api`)
- ✅ Facilitar roteamento e balanceamento de carga
- ✅ Separar responsabilidades por domínio
- ✅ Melhorar cache e CDN

## 📝 Como Usar

### Importar a configuração

```typescript
import { API_CONFIG } from '@app/config/api';

// Usar no código
const response = await axios.get(`${API_CONFIG.QUERIDO_DIARIO_API}/cities`);
```

### Nos Services

Os services já utilizam essa configuração:

```typescript
// src/services/interceptor.ts
const api = axios.create({
  baseURL: API_CONFIG.BACKEND_API,
});

// src/services/cities.ts
axios.get(`${API_CONFIG.QUERIDO_DIARIO_API}/cities?levels=3`)
```

## 🧪 Testes

Para testar com diferentes APIs:

```bash
# Testar com staging
REACT_APP_BACKEND_API=https://staging-api.diariosdoclima.org.br/api npm start

# Testar com ambiente local
REACT_APP_QUERIDO_DIARIO_API=http://localhost:3001 npm start
```

## 🚀 Deploy

As variáveis de ambiente são configuradas automaticamente no GitHub Actions através do workflow de deploy.

Se precisar alterar para um ambiente específico, edite o workflow em `.github/workflows/deploy-gh-pages.yml`.

## 📚 Referências

- **Backend API**: Documentação interna
- **Querido Diário API**: https://queridodiario.ok.org.br/api/docs

## 🔐 Segurança

- As variáveis de ambiente são injetadas em tempo de build
- Não exponha tokens ou credenciais no `.env`
- Use `.env.local` para configurações locais sensíveis (já ignorado no `.gitignore`)
- O arquivo `.env` contém apenas valores públicos seguros

## 🐛 Troubleshooting

### Erro de CORS

Se encontrar erros de CORS:
1. Verifique se a API permite requisições do domínio do frontend
2. Confirme que o subdomínio está correto
3. Verifique os headers CORS no servidor

### API não responde

1. Teste a URL diretamente no browser ou com `curl`:
   ```bash
   curl https://api.queridodiario.org.br/cities?levels=3
   ```

2. Verifique se as variáveis de ambiente estão corretas:
   ```bash
   echo $REACT_APP_QUERIDO_DIARIO_API
   ```

3. Limpe o cache e reconstrua:
   ```bash
   rm -rf node_modules/.cache
   npm run build
   ```

## 📋 Checklist de Migração

Ao mudar URLs de API:

- [ ] Atualizar `src/config/api.ts`
- [ ] Atualizar `.env` e `.env.example`
- [ ] Atualizar documentação (este arquivo)
- [ ] Testar localmente
- [ ] Atualizar workflow de CI/CD (se necessário)
- [ ] Comunicar time sobre mudanças
- [ ] Atualizar DNS/infraestrutura (se necessário)
