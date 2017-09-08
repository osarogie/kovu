export const setUser = (user, api_key = null) => ({
  type: 'SET_USER',
  user,
  api_key
})
export const logout = _ => ({
  type: 'LOGOUT'
})
export const setNightMode = night_mode => ({
  type: 'SET_NIGHT_MODE',
  night_mode
})
