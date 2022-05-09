import { ActionTypes } from "@mui/base";
import * as Action_Types from "../actionsTypes";
import { ProductByMount } from "../../utils/modals";
const initialState = {
    // selectedCategory: null
    productsList: [],
    CurrrentUser: null
}

export const productInListReducer = (state = initialState, action: any) => {
    switch (action.type) {

        case Action_Types.ADD_PRODUCT:
            return {
                ...state,
                productsList: [...state.productsList, action.payload]
            }
        case Action_Types.REMOVE_PRODUCT:
            return {
                ...state,
                productsList: [...state.productsList.filter(i => i !== action.payload)],
            }
        case Action_Types.DECREASE_PRODUCT:
            return {
                ...state,
                productsList: [...state.productsList.map((i: ProductByMount) => i == action.payload ? i.amount -= action.payload.amount : i)]
            }
        case Action_Types.INCREAES_PRODUCT:
            return {
                ...state,
                productsList: [...state.productsList.map((i: ProductByMount) => i == action.payload ? i.amount += action.payload.amount : i)]
            }
    }

    return state;
}