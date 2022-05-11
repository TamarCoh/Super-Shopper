import { User } from "../../utils/modals"
export const logIn = (person: User) => {
    return {
        type: "logIn",
        payload: person
    }
}
export const logOut = (person: User) => {
    return {
        type: "logOut",
        payload: person
    }
}
export const SignUp = (person: User) => {
    return {
        type: "SignUp",
        payload: person
    }
}
