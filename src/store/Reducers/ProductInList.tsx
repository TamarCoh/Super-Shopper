import { ActionTypes } from "@mui/base";
import * as Action_Types from "../actionsTypes";
import { ProductByMount } from "../../utils/modals";
import { removeProductFromList } from "../Actions/ProductInList";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { randomId } from "@mui/x-data-grid-generator";

// const Ex = () => {
//     // const [prognosis, setPrognosis] = React.useState<ProductByMount[]>([]);
//     let prognosis: IstatePro = {} as IstatePro;
//     prognosis.amountProducts = 0;
//     prognosis.productsList = [];
//     axios.get(`https://localhost:44378/api/GetPurchaseOffer/${store.getState().Use}`).then((response) => { prognosis.productsList = response.data; prognosis.amountProducts = response.data.size ? response.data.size : 0; })
//     return prognosis;
// }
export interface IstatePro {
    productsList: ProductByMount[],
    amountProducts: number
}
const initialState: IstatePro = {

} as IstatePro

export const productInListReducer = (state = initialState, action: any) => {
    debugger
    switch (action.type) {
        case Action_Types.GET_PURCHASE_LIST:
            return {
                productsList: action.payload.productsList,
                amountProducts: action.payload.amountProducts
                // state:action.payload
            }
        case Action_Types.REMOVE_PRODUCT:
            debugger

            return {
                ...state,
                productsList: [...state.productsList.map((i: ProductByMount) => { if (i.id == action.payload.id) { i.amount = 0; } return i })],
                amountProducts: state.amountProducts - 1
            }
        case Action_Types.DECREASE_PRODUCT:
            debugger
            return {
                ...state,
                productsList: state.productsList.map((i: ProductByMount) => { if (i.id == action.payload.id) { i.amount -= 1; if (i.amount == 0) state.amountProducts = state.amountProducts - 1 } return i })

            }
        case Action_Types.INCREAES_PRODUCT:
            debugger
            if (state.productsList.find((i: ProductByMount) => i.id == action.payload.id))
                return {
                    ...state,
                    productsList: [...state.productsList.map((i: ProductByMount) => {
                        if (i.id == action.payload.id) {
                            console.log(i.amount, action.payload.amount)
                            i.amount = i.amount + action.payload.amount;
                            console.log(i)
                        }
                        return i
                    })],

                }
            else return {
                ...state,
                productsList: [...state.productsList, action.payload],
                amountProducts: state.amountProducts + 1
            }
        case "clearPurchaseList":
            debugger
            return {
                productsList: [],
                amountProducts:0
            }
    }

    return state;
}