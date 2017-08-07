const initialState = {
  user: {},
  loggedIn: false
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      if (action.user) {
        return Object.assign({}, state, {
          user: action.user,
          loggedIn: true
        })
      } else return initialState

    default:
      return state
  }
}

export default user
