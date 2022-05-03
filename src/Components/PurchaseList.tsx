import { TableBody, TableCell, TableContainer, TableHead, TableRow, Table, TextField } from "@material-ui/core";
import Paper from '@mui/material/Paper';
import { useForm, } from "react-hook-form";
import axios from "axios";
import { styled } from "@material-ui/core";
import { } from "@material-ui/core";
import { Component, useState, useEffect } from "react";
import { JsxElement } from "typescript";
import "./PurchaseList.css"
import { Product } from "./Product";
export function PurchaseList() {

    // const [person, setPerson] = useState<Product>();
    const [data, setData] = useState<Product[]>();
    useEffect(() => {
        var peoplePromise = axios.get("https://localhost:44378/api/PurchasePrognosis").then((response) => {
            setData(response.data);
            console.log("hhhh")
        });
    }, []);
    return <div>
        <div id="wrap">
            {data == null ? <span>wait...</span> :

                <TableContainer component={Paper}>
                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">כמות</TableCell>
                                <TableCell align="right">המוצר</TableCell>
                                <TableCell align="right">קוד קניה</TableCell>

                                {/* <TableCell align="right">דוא"ל</TableCell> */}

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.map((row) => (
                                <TableRow
                                    key={row.PurchasePrognosisId}

                                >
                                    {/* <TableCell component="th" scope="row">
                                        {row.CustomerId}
                                    </TableCell> */}
                                    <TableCell align="right"><TextField id="standard-number" type="number" value={row.Amount} >   </TextField> </TableCell>
                                    <TableCell align="right">{row.ProductId}</TableCell>
                                    <TableCell align="right">{row.PurchasesHistoryId}</TableCell>

                                    {/* <TableCell align="right">{row.Email}</TableCell> */}


                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </div>

    </div>


}
export default PurchaseList;