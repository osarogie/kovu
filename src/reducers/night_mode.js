const initialState = false

const night_mode = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NIGHT_MODE':
      return action.night_mode == true

    default:
      return state
  }
}

export default night_mode
