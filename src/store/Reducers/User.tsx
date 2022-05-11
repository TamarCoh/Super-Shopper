import { User } from "../../utils/modals"
const initialState = {
    currentUser: null,
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
                currentUser: action.payload,
                usersList: [...state.usersList, action.payload]
            }
    }

    return state;
}