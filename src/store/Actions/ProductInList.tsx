import { ProductByMount, User } from "../../utils/modals";
import *  as Action_Types from "../actionsTypes";
import { IstatePro } from "../Reducers/ProductInList";
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
export const getPurchaseList = (list:IstatePro) => {
    return {
        type: Action_Types.GET_PURCHASE_LIST,
        payload: list
    }
}
export const clearPurchaseList = () => {
    return {
        type: "clearPurchaseList",
        
    }
}