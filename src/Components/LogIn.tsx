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
import Customer from "./Customer";
import SignUp from "./SignUp";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import { useNavigate } from "react-router-dom";
import { SsidChart } from "@mui/icons-material";


export function LogIn(): JSX.Element {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<Customer>();
    const addCustomer = async (data: Customer) => {
        console.log("start")
        console.log(data);
        let customerPromise = axios.get("https://localhost:44378/api/GetSpecific/" + data.Password + "/" + data.FirstName + "/" + data.LastName);
        let response = await customerPromise;
        if (response.data === null) {
            console.log("customer not found!!")
            navigate('/SignUp');
        }
        else {
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert variant="filled" severity="success">
                    This is a success alert — check it out!
                </Alert>
            </Stack>
        }

    }

    return <div>



        <div className="card">
            <h1>Log In</h1>
            <form onSubmit={handleSubmit(addCustomer)}>


                <span className="op">
                    <TextField id="standard-basic" variant="standard" type="text" label="FirstName"   {...register('FirstName', { required: true, minLength: 2, maxLength: 10 })}
                    // InputProps={{ startAdornment: (<InputAdornment position="start">  <AccountCircleIcon /> </InputAdornment>), }}
                    />
                    {errors.FirstName?.type === "required" && <span>FirstName is Missing</span>}
                    {errors.FirstName?.type === "minLength" && <span>FirstName is too short</span>}
                    {errors.FirstName?.type === "maxLength" && <span>FirstName is too long</span>}
                </span><br />

                <span className="op">
                    <TextField id="standard-basic" variant="standard" type="text" label="LastName"  {...register('LastName', { required: true, minLength: 2, maxLength: 10 })}
                    // InputProps={{ startAdornment: (<InputAdornment position="start">  <AccountCircleIcon /> </InputAdornment>), }}
                    />
                    {errors.LastName?.type === "required" && <span>LastName is Missing</span>}
                    {errors.LastName?.type === "minLength" && <span>LastName is too short</span>}
                    {errors.LastName?.type === "maxLength" && <span>LastName is too long</span>}
                </span><br />



                <span className="op">
                    <TextField id="standard-basic" variant="standard" type="password" label="Password"  {...register('Password', { required: true, minLength: 6, maxLength: 8 })}
                    // InputProps={{ startAdornment: (<InputAdornment position="start" > <IconButton ><VisibilityIcon /></IconButton> </InputAdornment>), }}
                    />
                    {errors.Password?.type === "required" && <span>Password is Missing</span>}
                    {errors.Password?.type === "minLength" && <span>Password is too short</span>}
                    {errors.Password?.type === "maxLength" && <span>Password is too long</span>}
                </span><br />



                <Button variant="contained" type='submit'
                    color="secondary"
                    endIcon={<SendIcon />}>
                    Send
                </Button>



            </form>

        </div>

    </div >

    function getComponent() {





    }
}
export default LogIn;
