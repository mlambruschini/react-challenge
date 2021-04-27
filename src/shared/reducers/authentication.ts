export const ACTION_TYPES = {
  LOGIN_ERROR: "authentication/LOGIN_ERROR",
  LOGIN_SUCCESS: "authentication/LOGIN_SUCCESS",
  LOGOUT: "authentication/LOGOUT",
};

const initialState = {
  isAuthenticated: false,
  loginSuccess: false,
  token: (null as unknown) as string,
};

export type AuthenticationState = Readonly<typeof initialState>;

// eslint-disable-next-line import/no-anonymous-default-export
export default (
  state: AuthenticationState = initialState,
  action: any
): AuthenticationState => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_ERROR:
      return { ...state, isAuthenticated: false };
    case ACTION_TYPES.LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true, token: action.payload };
    case ACTION_TYPES.LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
};

const TOKEN = "token";

export const loginSucess = (tokenValue: string, rememberMe: boolean) => {
  if (rememberMe) {
    localStorage.setItem(TOKEN, tokenValue);
  } else {
    sessionStorage.setItem(TOKEN, tokenValue);
  }
  return {
    type: ACTION_TYPES.LOGIN_SUCCESS,
    payload: tokenValue,
  };
};

export const checkSavedToken = () => {
  if (localStorage.getItem(TOKEN))
    return {
      type: ACTION_TYPES.LOGIN_SUCCESS,
      payload: localStorage.getItem(TOKEN),
    };

  return {
    type: ACTION_TYPES.LOGIN_ERROR,
  };
};

export const loginError = () => {
  return {
    type: ACTION_TYPES.LOGIN_ERROR,
  };
};

export const clearAuthToken = () => {
  if (localStorage.getItem(TOKEN)) {
    localStorage.removeItem(TOKEN);
  }
  if (sessionStorage.getItem(TOKEN)) {
    sessionStorage.removeItem(TOKEN);
  }
};

export const logout: () => void = () => {
  if (localStorage.getItem(TOKEN)) {
    localStorage.removeItem(TOKEN);
  }
  if (sessionStorage.getItem(TOKEN)) {
    sessionStorage.removeItem(TOKEN);
  }
  return {
    type: ACTION_TYPES.LOGOUT,
  };
};
