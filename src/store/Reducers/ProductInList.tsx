import { ActionTypes } from "@mui/base";
import * as Action_Types from "../actionsTypes";
import { ProductByMount } from "../../utils/modals";
import { removeProductFromList } from "../Actions/ProductInList";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Ex = () => {
    // const [prognosis, setPrognosis] = React.useState<ProductByMount[]>([]);
    let prognosis: IstatePro = {} as IstatePro;
    prognosis.amountProducts = 0;
    prognosis.productsList = [];
    axios.get(`https://localhost:44378/api/GetPurchaseOffer/${786235}`).then((response) => { prognosis.productsList = response.data; prognosis.amountProducts = response.data.size ? response.data.size : 0; })
    return prognosis;
}
export interface IstatePro {
    productsList: ProductByMount[],
    amountProducts: number
}
const initialState: IstatePro = Ex();

export const productInListReducer = (state = initialState, action: any) => {
    debugger
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
            debugger
            if (state.productsList.find((i: ProductByMount) => i == action.payload) != undefined)
                return {
                    ...state,
                    productsList: [...state.productsList.map((i: ProductByMount) => i == action.payload ? i.amount += action.payload.amount : i)],

                }
            else return {
                ...state,
                productsList: [...state.productsList, action.payload],
                amountProducts: state.amountProducts + 1
            }
    }

    return state;
}