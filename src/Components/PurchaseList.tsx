import { TableBody, TableCell, TableContainer, TableHead, TableRow, Table, TextField } from "@material-ui/core";
import Paper from '@mui/material/Paper';
import { useForm, } from "react-hook-form";
import axios from "axios";
import { StyledComponentProps } from "@material-ui/core";
import { } from "@material-ui/core";
import { Component, useState, useEffect } from "react";
import { JsxElement } from "typescript";
import "./PurchaseList.css"
import { Product } from "./Product";
import { connect } from "react-redux";
import { ProductByMount } from "../utils/modals";
export function PurchaseList(props: any) {

    const [person, setPerson] = useState<Product>();
     const [data, setData] = useState<Product[]>([]);
    useEffect(() => {
        var peoplePromise = axios.get("https://localhost:44378/api/PurchasePrognosis").then((response) => {
            setData(response.data);
            console.log("hhhh")
        });
    }, []);
    return <div>
        <div id="wrap">
            {/* {props.myArr == null ? <span>wait...</span> : */}

            <TableContainer component={Paper}>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">amount</TableCell>
                            <TableCell align="right">Product</TableCell>
                            <TableCell align="right">Purchase code</TableCell>

                            {/* <TableCell align="right">דוא"ל</TableCell> */}

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.myArr?.map((row: ProductByMount) => (
                            <TableRow
                                key={row.PurchasePrognosisId}

                            >
                                {/* <TableCell component="th" scope="row">
                                        {row.CustomerId}
                                    </TableCell> */}
                                <TableCell align="right"><TextField id="standard-number" type="number" value={row.amount} >   </TextField> </TableCell>
                                <TableCell align="right">{row.id}</TableCell>
                                <TableCell align="right">{row.PurchasesHistoryId}</TableCell>

                                {/* <TableCell align="right">{row.Email}</TableCell> */}


                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* } */}
        </div>

    </div>


}
const mapStateToProps = (st: any) => {
    //הפונקציה תחזיר אובייקט ובו כל השדות שאנו רוצים שייכנסו לפרופס של הקומםוננטה שלנו
    //מתןך הסטייט הכללי
    return {
        myArr: st.productsList,
    };
}
export default connect(mapStateToProps)(PurchaseList);