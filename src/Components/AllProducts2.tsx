
// import { TableBody, TableCell, TableContainer, TableHead, TableRow, Table, TextField } from "@material-ui/core";
// import Paper from '@mui/material/Paper';
// import { useForm, } from "react-hook-form";
// import axios from "axios";
// import { StyledComponentProps } from "@material-ui/core";
// import { } from "@material-ui/core";
// import { Component, useState, useEffect } from "react";
// import { JsxElement } from "typescript";
// import "./PurchaseList.css"
// // import Category from "./Category";
// import { ProductByCategory } from "../utils/modals";
// import Product from "./ProductByBuy";
// export function AllProducts(props: any) {

//     // const [category, setCategory] = useState<Category[]>();
//     // const [products, setProduct] = useState<ProdInCategory[]>();
//     // useEffect(() => {
//     //     var productsPromise = axios.get("https://localhost:44378/api/Product").then((response) => {
//     //         setProduct(response.data);
//     //         console.log("hhhh")
//     //     });
//     // }, []);
//     // useEffect(() => {
//     //     var categoryPromise = axios.get("https://localhost:44378/api/Category").then((response) => {
//     //         setCategory(response.data);
//     //         console.log("hhhh")
//     //     });
//     // }, []);
//     return <div>
//         <div id="wrap">
//             {props.catgory == null ? <span>wait...</span> :

//                 <TableContainer component={Paper}>
//                     <Table >
//                         <TableHead>
//                             <TableRow>

//                                 <TableCell align="right">Category</TableCell>
//                                 {/* <TableCell align="right">קוד מוצר</TableCell> */}

//                                 {/* <TableCell align="right">דוא"ל</TableCell> */}

//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {props.productList?.map((row: ProductByCategory) => (
//                                 <TableRow
//                                     key={row.id}

//                                 >
//                                     {/* <TableCell component="th" scope="row">
//                                         {row.CustomerId}
//                                     </TableCell> */}

//                                     <TableCell align="right" key={row.id}><Product product={row} key={row.id} /></TableCell>
//                                     {/* <TableCell align="right">{row.ProductId}</TableCell> */}

//                                     {/* <TableCell align="right">{row.Email}</TableCell> */}


//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             }
//         </div>

//     </div>


// }

export{}