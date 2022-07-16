import { SET_USER } from "../actions/actionType";
// const initialToken = localStorage.getItem("token") || "";
// const iniUser = JSON.parse(localStorage.getItem("user")) || {};

// const [token, setToken] = useState(initialToken);
// const [user, setUser] = useState(iniUser);

// const userIsLoggedIn = !!token;

// const logoutHandler = useCallback(() => {
//   setToken(null);
//   localStorage.removeItem("token");
//   localStorage.removeItem("user");
// }, []);

// const loginHandler = (token) => {
//   setToken(token);
//   localStorage.setItem("token", token);
// };
// const setUserHandler = (data) => {
//   setUser(data);
//   localStorage.setItem("user", JSON.stringify(data));
// };
const INITIAL_STATE = {
  user: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};
export default userReducer;
