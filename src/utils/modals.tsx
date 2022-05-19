import {
    randomCreatedDate,
    randomTraderName,
    randomUpdatedDate,
    randomId,
} from '@mui/x-data-grid-generator';
export interface User {
    firstName: string,
    lastName: string,
    password: string,
    email:string
}

export const enum categories {
    'milk',
    ''
}

export interface Category {
    id: number,
    title: string
}

export interface ProductByCategory {
    id: number,
    name: string,
    category: number
}

export interface ProductByMount {
    idrow:string,
    id: number,
    name: string,
    category: number,
    PurchasesHistoryId: string,
    PurchasePrognosisId: string,
    amount: number
}