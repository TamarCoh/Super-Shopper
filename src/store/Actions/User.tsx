import { User } from "../../utils/modals"
export const logIn = (person: User) => {
    return {
        type: "logIn",
        payload: person
    }
}
export const logOut = () => {
    return {
        type: "logOut",
        
    }
}
export const SignUp = (person: User) => {
    return {
        type: "SignUp",
        payload: person
    }
}
