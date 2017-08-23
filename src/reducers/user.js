const initialState = {
  user: {},
  api_key: null,
  loggedIn: false
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      if (action.user) {
        return Object.assign({}, state, {
          user: action.user,
          api_key: action.api_key,
          loggedIn: true
        })
      } else return initialState
    case 'LOGOUT':
      return initialState
    default:
      return state
  }
}

export default user
