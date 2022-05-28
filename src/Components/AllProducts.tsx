import { TableBody, TableCell, TableContainer, TableHead, TableRow, Table, TextField } from "@material-ui/core";
import Paper from '@mui/material/Paper';
import { useForm, } from "react-hook-form";
import axios from "axios";
import { StyledComponentProps } from "@material-ui/core";
import { } from "@material-ui/core";
import { Component, useState, useEffect } from "react";
import { JsxElement } from "typescript";
import "./AllProducts.css"
// import Category from "./Category";
// import ProdInCategory from "./ProdInCategory";
import { Category, ProductByCategory } from "../utils/modals";
import Product from "./ProductByBuy";

interface Prop{
    catgory:Category,
    productList:ProductByCategory[]
}
export default function AllProducts(props:Prop) {

    // const [category, setCategory] = useState<Category[]>();
    // const [products, setProduct] = useState<ProdInCategory[]>();
    // useEffect(() => {
    //     var productsPromise = axios.get("https://localhost:44378/api/Product").then((response) => {
    //         setProduct(response.data);
    //         console.log("hhhh")
    //     });
    // }, []);
    // useEffect(() => {
    //     var categoryPromise = axios.get("https://localhost:44378/api/Category").then((response) => {
    //         setCategory(response.data);
    //         console.log("hhhh")
    //     });
    // }, []);
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

