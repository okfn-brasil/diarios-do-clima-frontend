// API Configuration
export const API_CONFIG = {
  // Backend API for Diários do Clima
  BACKEND_API: process.env.REACT_APP_BACKEND_API || 'https://api.diariosdoclima.org.br/api',

  // Querido Diário API - using subdomain instead of path
  QUERIDO_DIARIO_API: process.env.REACT_APP_QUERIDO_DIARIO_API || 'https://api.queridodiario.ok.org.br',
};
