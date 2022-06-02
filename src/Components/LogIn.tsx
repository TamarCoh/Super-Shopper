import { Component, useState } from "react";
import { JsxElement, SignatureKind } from "typescript";
import { Box, FormControl, TextField, Button } from "@material-ui/core";
import Icon from '@mui/material/Icon';
import './SignIn.css';
import { render } from "@testing-library/react";
import * as React from 'react';
import SendIcon from '@mui/icons-material/Send';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { type } from "os";
import { ClassNames } from "@emotion/react";
import { useForm } from "react-hook-form";
import axios from "axios";
// import Customer from "./Customer";
import SignUp from "./SignUp";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { ProductByMount, User } from "../utils/modals";
import { useNavigate } from "react-router-dom";
import { SsidChart } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../store/Actions/User";
import { getPurchaseList } from "../store/Actions/ProductInList";
import { IstatePro } from "../store/Reducers/ProductInList";
import { randomId } from "@mui/x-data-grid-generator";


// import { createTheme } from '@mui/material/styles';


// const theme = createTheme({
//     palette: {
//         primary: {
//             light: '#757ce8',
//             main: '#f8bbd0',
//             dark: '#002884',
//             contrastText: '#fff',
//         },
//         secondary: {
//             light: '#ff7961',
//             main: '#f44336',
//             dark: '#ba000d',
//             contrastText: '#000',
//         },
//     },
// });

export async function getList(payload: User) {
    let prognosis: IstatePro = {} as IstatePro;
    prognosis.amountProducts = 0;
    prognosis.productsList = [];
    await axios.get(`https://localhost:44378/api/GetPurchaseOffer/${payload.id}`).then((response) => {
        debugger
        prognosis.productsList = response.data.map((p: any) => {
            let product: ProductByMount
            product = {
                idrow: randomId(),
                id: p.ProductId,
                name: p.Name,
                PurchasesHistoryId: p.PurchasesHistoryId,
                PurchasePrognosisId: p.PurchasePrognosisId,
                amount: p.Amount
            }
            return product as ProductByMount
        });
        prognosis.amountProducts = response.data.length ? response.data.length : 0;
    })


    return prognosis
}

export function LogIn(): JSX.Element {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm<User>();
    const addCustomer = async (data: User) => {
        try {
            debugger
            console.log("start")
            console.log(data);
            let customerPromise = await axios.get(`https://localhost:44378/api/GetCustomerByPassswordName/${data.password}/${data.firstName}/${data.lastName}`).then(async response => {
                if (response.data == null) {
                    console.log("customer not found!!")
                    navigate('/SignUp');
                }
                let user: User
                user = {
                    firstName: response.data.FirstName,
                    lastName: response.data.LastName,
                    id: response.data.CustomerId,
                    password: response.data.Password,
                    email: response.data.Email
                }
                localStorage.setItem('user', JSON.stringify(user))
                console.log("user :   " + { user });
                dispatch(logIn(user))
                const list: IstatePro = await getList(user) as IstatePro

                localStorage.setItem('productList', JSON.stringify(list))
                dispatch(getPurchaseList(list));

            }).then(() => { navigate('', { state: { isOpen: false } }) })
        }
        catch {
            console.log(errors)
        }
        // <Stack sx={{ width: '100%' }} spacing={2}>
        //     <Alert variant="filled" severity="success">
        //         This is a success alert — check it out!
        //     </Alert>
        // </Stack>
        // if (response.data === null) {
        //    
        // }
        // else {

        // }

    }

    return <div>



        <div className="card">
            <h1>התחברות</h1>
            <form onSubmit={handleSubmit(addCustomer)}>


                <span className="op">
                    <TextField id="standard-basic" variant="standard" type="text" label="שם פרטי"   {...register('firstName', { required: true, minLength: 2, maxLength: 10 })}
                    // InputProps={{ startAdornment: (<InputAdornment position="start">  <AccountCircleIcon /> </InputAdornment>), }}
                    />
                    {errors.firstName?.type === "required" && <span>חסר שם פרטי</span>}
                    {errors.firstName?.type === "minLength" && <span>שם פרטי קצר מדי</span>}
                    {errors.firstName?.type === "maxLength" && <span>שם פרטי ארוך מדי</span>}
                </span><br />

                <span className="op">
                    <TextField id="standard-basic" variant="standard" type="text" label="שם משפחה"  {...register('lastName', { required: true, minLength: 2, maxLength: 10 })}
                    // InputProps={{ startAdornment: (<InputAdornment position="start">  <AccountCircleIcon /> </InputAdornment>), }}
                    />
                    {errors.lastName?.type === "minLength" && <span>שם משפחה קצר מדי</span>}
                    {errors.lastName?.type === "maxLength" && <span>שם משפחה ארוך מדי</span>}
                    {errors.lastName?.type === "required" && <span>חסר שם משפחה</span>}
                </span><br />



                <span className="op">
                    <TextField id="standard-basic" variant="standard" type="password" label="סיסמה"  {...register('password', { required: true, minLength: 6, maxLength: 8 })}
                    // InputProps={{ startAdornment: (<InputAdornment position="start" > <IconButton ><VisibilityIcon /></IconButton> </InputAdornment>), }}
                    />
                    {errors.password?.type === "required" && <span>חסרה סיסמה</span>}
                    {errors.password?.type === "minLength" && <span>סיסמה קצרה מדי</span>}
                    {errors.password?.type === "maxLength" && <span>סיסמה ארוכה מדי</span>}
                </span><br />



                <Button variant="contained" type='submit'
                    color="primary"
                    endIcon={<SendIcon />}
                // onClick={() => { navigate('/') }}
                >
                    {/* //check if existing */}
                    {/* //update state with cuurrent user */}
                    שלח
                </Button>



            </form>

        </div>

    </div >

    function getComponent() {





    }
}
export default LogIn;
