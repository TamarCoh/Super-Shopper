// import { ActionTypes } from "@mui/base";
// import { TypeAction } from "@mui/material";
import { ActionTypes } from "@mui/base";
import Category from "../../Components/Category";
import * as Action_Types from "../actionsTypes";
const initialState = {   
    selectedCategory: null
}

export const categoryReducer = (state = initialState, action:any) => {
    switch (action.type) {
        
        case Action_Types.SELECT_CATEGORY:
            return {
                ...state,
                selectedCategory: action.payload
            }
    }
    return state;
}