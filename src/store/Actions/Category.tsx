import *  as Action_Types from "../actionsTypes";
export const selectCategory = (id: Number) => {
    return {
        type: "SELECT_CATEGORY",
        payload: id
    }
}