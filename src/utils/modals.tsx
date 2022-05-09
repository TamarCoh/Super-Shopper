export interface User {
    name: string,
    passward: string
}

export const enum catepories {
'milk',
''
}

export interface Category{
    id:number,
    title :string
}

export interface ProductByCategory{
    id:number,
    name :string,
    category:number
}

export interface ProductByMount{
    id:number,
    name :string,
    category:Category,
    PurchasesHistoryId:string,
    PurchasePrognosisId:string,
    amount:number
}