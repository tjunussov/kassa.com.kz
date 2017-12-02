export const API_ROOT = (process.env.NODE_ENV === 'production')
  ? 'https://api.check.kz/'
  :'http://localhost:8099/'

export const CookieDomain = (process.env.NODE_ENV === 'production')
  ? '.check.kz'
  : ''