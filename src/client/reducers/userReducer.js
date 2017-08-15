const user = (state = {
  name: '',
  authenticated: false,
}, action) => {
  switch (action.type) {
    case 'TOGGLE_AUTHENTICATED': {
      const newState = { ...state };
      newState.authenticated = !state.authenticated;
      return newState;
    }
    case 'RENAME_USER': {
      const newState = { ...state };
      newState.name = action.name;
      return newState;
    }
    default:
      return state;
  }
};

export default user;
