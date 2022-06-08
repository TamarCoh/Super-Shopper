import { User } from "../../utils/modals"
const initialState: User = {
    // currentUser: {
    //     firstName: "יהודה",
    //     lastName: "כהן",
    //     id: 123,
    //     password: 876235,
    //     email: "YC458@gmail.com"
    // },


    // usersList: [] = []
} as User
// interface IuserState{
//     current:User;
// }
export const userReducer = (state = initialState, action: any) => {
    switch (action.type) {

        case "logIn":
            ;
            return {
                state: action.payload

            }
        case "logOut":
            return {
                state: null
            }
        case "signUp":
            return {
                state: action.payload,
            }
    }

    return state;
}