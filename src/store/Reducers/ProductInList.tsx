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
const initialState: IstatePro = {} as IstatePro;

export const productInListReducer = async (state = initialState, action: any) => {
    debugger
    switch (action.type) {
        case Action_Types.GET_PURCHASE_LIST:
            let prognosis: IstatePro = {} as IstatePro;
            prognosis.amountProducts = 0;
            prognosis.productsList = [];
            await axios.get(`https://localhost:44378/api/GetPurchaseOffer/${action.payload.id}`).then((response) => {
                debugger
                prognosis.productsList = response.data.map((p: any) => {
                    let product: ProductByMount
                    product = {
                        idrow: randomId(),
                        id: p.ProductId,
                        name: p.Name,
                        PurchasesHistoryId: p.PurchasesHistoryId,
                        PurchasePrognosisId: p.PurchasePrognosisId,
                        amount: p.Amount
                    }
                    return product as ProductByMount
                });
                prognosis.amountProducts = response.data.size ? response.data.size : 0;
            })
            debugger
            return {
                ...state,
                productsList: prognosis.productsList,
                amountProducts: prognosis.amountProducts
            }
        case Action_Types.REMOVE_PRODUCT:
            debugger

            return {
                ...state,
                productsList: [...state.productsList.filter((i: ProductByMount) => i.id !== action.payload.id)],
                amountProducts: state.amountProducts - 1
            }
        case Action_Types.DECREASE_PRODUCT:
            debugger
            state.productsList = state.productsList.map((i: ProductByMount) => { if (i.id == action.payload.id) { i.amount -= 1; } return i }).filter((i: ProductByMount) => i.amount > 0)
            return {
                ...state,
                // productsList: [...state.productsList.map((i: ProductByMount) => { if (i.id == action.payload.id) { i.amount -= 1; } return i }).filter((i: ProductByMount) => i.amount > 0)],//check recurse
                amountProducts: state.amountProducts - 1

            }
        case Action_Types.INCREAES_PRODUCT:
            debugger
            if (state.productsList.find((i: ProductByMount) => i.id == action.payload.id))
                return {
                    ...state,
                    productsList: [...state.productsList.map((i: ProductByMount) => {
                        if (i.id == action.payload.id)
                            i.amount += action.payload.amount
                        return i
                    })],

                }
            else return {
                ...state,
                productsList: [...state.productsList, action.payload],
                amountProducts: state.amountProducts + 1
            }
    }

    return state;
}