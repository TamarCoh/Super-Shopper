import { TableBody, TableCell, TableContainer, TableHead, TableRow, Table, TextField } from "@material-ui/core";
import Paper from '@mui/material/Paper';
import { useForm, } from "react-hook-form";
import axios from "axios";
import { StyledComponentProps } from "@material-ui/core";
import { } from "@material-ui/core";
import { Component, useState, useEffect } from "react";
import { JsxElement } from "typescript";
import "./PurchaseList.css"
import "./AllProducts.css"
// import Category from "./Category";
// import ProdInCategory from "./ProdInCategory";
import { ProductByCategory } from "../utils/modals";
import Product from "./ProductByBuy";
import "./AllProducts.css";

export function AllProducts(props: any) {

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
    return <div>
        <div >
            {props.catgory == null ? <span>please wait...</span> :
                <div id="wrap">
                    {props.productList == null ? <span>no products suitable...</span> : props.productList.map((row: ProductByCategory) => (


                        <Product product={row} key={row.id} />


                    ))}
                </div>

            }
        </div>

    </div>


}

