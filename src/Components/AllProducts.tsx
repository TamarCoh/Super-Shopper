
import { } from "@material-ui/core";
import "./AllProducts.css"
import { Category, ProductByCategory } from "../utils/modals";
import Product from "./ProductByBuy";

interface Prop{
    catgory:Category,
    productList:ProductByCategory[]
}
export default function AllProducts(props:Prop) {
    return (<>
        {props.catgory == null ? <span>אנא המתן...</span> :
            <div id="wrap">
                {props.productList == null ? <span> לא נמצאו מוצרים תואמים...</span> : props.productList.map((row: ProductByCategory) => (
                    <Product product={row} key={row.id} />
                ))}
            </div>
        }
    </>
    )
}

