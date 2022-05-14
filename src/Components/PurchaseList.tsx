import { TableBody, TableCell, TableContainer, TableHead, TableRow, Table, TextField } from "@material-ui/core";
import Paper from '@mui/material/Paper';
import { useForm, } from "react-hook-form";
import axios from "axios";
import { StyledComponentProps } from "@material-ui/core";
import { } from "@material-ui/core";
import { Component, useState, useEffect } from "react";
import { JsxElement } from "typescript";
import "./PurchaseList.css"
import Product from "./ProductByBuy";
import { connect } from "react-redux";
import { ProductByMount } from "../utils/modals";

import { LicenseInfo } from '@mui/x-data-grid-pro';

// LicenseInfo.setLicenseKey(
//     'x0jTPl0USVkVZV0SsMjM1kDNyADM5cjM2ETPZJVSQhVRsIDN0YTM6IVREJ1T0b9586ef25c9853decfa7709eee27a1e',
// );
//-----------------------------

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    GridRowsProp,
    useGridApiRef,
    DataGridPro,
    GridApi,
    GridColumns,
    GridRowParams,
    MuiEvent,
    GridToolbarContainer,
    GridActionsCellItem,
    GridEventListener,
    GridEvents,
    GridRowId,
    GridRowModel,
} from '@mui/x-data-grid-pro';
// import {
//     randomCreatedDate,
//     randomTraderName,
//     randomUpdatedDate,
//     randomId,
// } from '@mui/x-data-grid-generator';


export function PurchaseList(props: any) {

    // const [person, setPerson] = useState<User>();
    // const [data, setData] = useState<ProductByMount[]>([]);
    // useEffect(() => {
    //     var peoplePromise = axios.get("https://localhost:44378/api/PurchasePrognosis").then((response) => {
    //         setData(response.data);
    //         console.log("hhhh")
    //     });
    // }, []);

    const apiRef = useGridApiRef();
    const handleDeleteClick = (id: GridRowId) => (event: React.MouseEvent) => {
        event.stopPropagation();
        apiRef.current.updateRows([{ id, _action: 'delete' }]);
    };
    return <div>
        <div id="wrap">
            {/* {props.myArr == null ? <span>wait...</span> : */}

            <TableContainer component={Paper}>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Purchase code</TableCell>
                            <TableCell align="center">Product</TableCell>
                            <TableCell align="center">amount</TableCell>

                            {/* <TableCell align="right">דוא"ל</TableCell> */}

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.myArr?.map((row: ProductByMount) => (
                            <TableRow key={row.PurchasePrognosisId}   >
                                {/* <TableCell component="th" scope="row">
                                        {row.CustomerId}
                                    </TableCell> */}

                                <TableCell align="center">{row.PurchasesHistoryId}</TableCell>
                                <TableCell align="center">{row.id}</TableCell>
                                <TableCell align="center"><TextField id="standard-number" type="number" value={row.amount} >   </TextField> </TableCell>
                                <GridActionsCellItem
                                    icon={<DeleteIcon />}
                                    label="Delete"
                                    onClick={handleDeleteClick(row.id)}
                                    color="inherit"
                                />,
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
        myArr: st.pro.productsList,
        // myArr:[]=[{d: 123,
        //     name: "name",
        //     category: 1,
        //     PurchasesHistoryId: "123",
        //     PurchasePrognosisId: "fgvhj",
        //     amount: 3}]
    };
}
export default connect(mapStateToProps)(PurchaseList);