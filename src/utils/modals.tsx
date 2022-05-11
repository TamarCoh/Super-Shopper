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
    id: number,
    name: string,
    category: number,
    PurchasesHistoryId: string,
    PurchasePrognosisId: string,
    amount: number
}