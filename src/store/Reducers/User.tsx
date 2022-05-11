import { User } from "../../utils/modals"
const initialState = {
    CurrrentUser: null,
    usersList: [] = []
}
export const usertReducer = (state = initialState, action: any) => {
    switch (action.type) {

        case "logIn":
            return {
                ...state,
                currentUser: action.payload
            }
        case "logOut":
            return {
                ...state,
                currentUser: null
            }
        case "SignUp":
            return {
                usersList: [...state.usersList, action.payload],
                currentUser: action.payload
            }
    }

    return state;
}