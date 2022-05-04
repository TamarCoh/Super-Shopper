import { selectCategory } from "../store/Actions/Category"
export default class Category {

    constructor(public ProductCategoryId: number, public ParentProductCategoryId: number, public Name: string) {

    }
    return() {
        <button onClick={() => selectCategory(this.ProductCategoryId)}>{this.Name}</button>
    }
}