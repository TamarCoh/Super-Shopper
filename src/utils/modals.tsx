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
    id:string,
    name :string,
    categoryId:number
}

export interface ProductByMount{
    id:string,
    name :string,
    category:Category,
    PurchasesHistoryId:string,
    PurchasePrognosisId:string,
    amount:number
}