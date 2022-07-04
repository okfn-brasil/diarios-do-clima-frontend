export const tokenKeys = {
  access: 'tk',
  refresh: 'rh',
  cookies: 'cookieAlertClosed',
}

export const deleteTokens = () => {
  localStorage.removeItem(tokenKeys.access);
  localStorage.removeItem(tokenKeys.refresh);
}
