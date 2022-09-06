const initialStateGlobal = {
  auth: {
    isLogin: false,
    userInfo: {},
  },
}

export const globalReducer = (state = initialStateGlobal, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        auth: action.payload,
      }
    default:
      return state
  }
}
