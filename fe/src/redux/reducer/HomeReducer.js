const initialStateHome = {
  listUsers: [],
}

export const homeReducer = (state = initialStateHome, action) => {
  switch (action.type) {
    case 'GET_USERS':
      return {
        ...state,
        listUsers: action.payload,
      }
    default:
      return state
  }
}
