import {
    randomCreatedDate,
    randomTraderName,
    randomUpdatedDate,
    randomId,
} from '@mui/x-data-grid-generator';
export interface User {
    firstName: string,
    lastName: string,
    id: string,
    password: string,
    email: string
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
    name: string,
    id: number,

    category: number
}

export interface ProductByMount {
    idrow: string,
    id: number,
    name: string,
   // category: number,
    PurchasesHistoryId: string,
    PurchasePrognosisId: string,
    amount: number
}