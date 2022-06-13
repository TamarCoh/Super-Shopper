import {
    randomCreatedDate,
    randomTraderName,
    randomUpdatedDate,
    randomId,
} from '@mui/x-data-grid-generator';
export interface User {
    firstName: string,
    lastName: string,
    id: number,
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
    img: string,
    category: number,
    description:string
}

export interface ProductByMount {
    idrow: string,
    id: number,
    name: string,
    // category: number,
    PurchasesHistoryId: string,
    PurchasePrognosisId: string,
    amount: number,
    description:string,
    img:string
}

export interface ActuallyPurchase {
    PurchasesHistoryId: number,
    ProductId: number,
    Name: string,
    Amount: number,
    PurchasePrognosisId: number,
}