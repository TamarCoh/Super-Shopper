import { User } from "../../utils/modals";
const initialState: User = {} as User;
export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "logIn":
      return {
        state: action.payload,
      };
    case "logOut":
      return {
        state: null,
      };
    case "signUp":
      return {
        state: action.payload,
      };
  }

  return state;
};
