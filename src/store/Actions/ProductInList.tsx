import { ProductByMount } from "../../utils/modals";
import *  as Action_Types from "../actionsTypes";
// export const addProductToList = (product: ProductByMount) => {
//     return {
//         type: Action_Types.ADD_PRODUCT,
//         payload: product
//     }
// }
export const removeProductFromList = (product: ProductByMount) => {
    return {
        type: Action_Types.REMOVE_PRODUCT,
        payload: product
    }
}
export const increaseProductInList = (product: ProductByMount) => {
    return {
        type: Action_Types.INCREAES_PRODUCT,
        payload: product
    }
}
export const decreaseProductInList = (product: ProductByMount) => {
    return {
        type: Action_Types.DECREASE_PRODUCT,
        payload: product
    }
}