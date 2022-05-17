import { ActionTypes } from "@mui/base";
import * as Action_Types from "../actionsTypes";
import { ProductByMount } from "../../utils/modals";
import { removeProductFromList } from "../Actions/ProductInList";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Ex = () => {
    // const [prognosis, setPrognosis] = React.useState<ProductByMount[]>([]);
    let prognosis: ProductByMount[] = [];
    axios.get("https://localhost:44378/api/PurchasePrognosis").then((response) => { prognosis = response.data; })
    return prognosis;
}
export interface IstatePro {
    productsList: ProductByMount[],
    amountProducts: number
}
const initialState: IstatePro = {
    productsList: [] = Ex(),
    amountProducts: 0
}

export const productInListReducer = (state = initialState, action: any) => {
    switch (action.type) {

        case Action_Types.REMOVE_PRODUCT:
            return {
                ...state,
                productsList: [...state.productsList.filter((i: ProductByMount) => i.id !== action.payload)],
                amountProducts: state.amountProducts - action.payload.amount
            }
        case Action_Types.DECREASE_PRODUCT:
            return {
                ...state,
                productsList: [...state.productsList.map((i: ProductByMount) => i == action.payload ? i.amount == 1 ? removeProductFromList(i) : i.amount -= 1 : i)],//check recurse
                amountProducts: state.amountProducts - 1

            }
        case Action_Types.INCREAES_PRODUCT:
            if (state.productsList.find((i: ProductByMount) => i == action.payload))
                return {
                    ...state,
                    productsList: [...state.productsList.map((i: ProductByMount) => i == action.payload ? i.amount += action.payload.amount : i)],
                    amountProducts: state.amountProducts + action.payload.amount
                }
            else return {
                ...state,
                productsList: [...state.productsList, action.payload],
                amountProducts: state.amountProducts + action.payload.amount
            }
    }

    return state;
}