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
import { User } from "../utils/modals";
import { useNavigate } from "react-router-dom";
import { SsidChart } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { logIn } from "../store/Actions/User";


export function LogIn(): JSX.Element {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm<User>();
    const addCustomer = async (data: User) => {
        console.log("start")
        console.log(data);
        let customerPromise = axios.get("https://localhost:44378/api/GetSpecific/" + data.password + "/" + data.firstName + "/" + data.lastName);
        let response = await customerPromise;
        let user: User
        user = {
          firstName: response.data.FirstName,
          lastName: response.data.LastName,
          id: response.data.CustomerId,
          password: response.data.Password,
          email:response.data.Email
        }
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
         dispatch(logIn(user));
            navigate('./purchaseList')
        }

    }

    return <div>



        <div className="card">
            <h1>Log In</h1>
            <form onSubmit={handleSubmit(addCustomer)}>


                <span className="op">
                    <TextField id="standard-basic" variant="standard" type="text" label="FirstName"   {...register('firstName', { required: true, minLength: 2, maxLength: 10 })}
                    // InputProps={{ startAdornment: (<InputAdornment position="start">  <AccountCircleIcon /> </InputAdornment>), }}
                    />
                    {errors.firstName?.type === "required" && <span>FirstName is Missing</span>}
                    {errors.firstName?.type === "minLength" && <span>FirstName is too short</span>}
                    {errors.firstName?.type === "maxLength" && <span>FirstName is too long</span>}
                </span><br />

                <span className="op">
                    <TextField id="standard-basic" variant="standard" type="text" label="LastName"  {...register('lastName', { required: true, minLength: 2, maxLength: 10 })}
                    // InputProps={{ startAdornment: (<InputAdornment position="start">  <AccountCircleIcon /> </InputAdornment>), }}
                    />
                    {errors.lastName?.type === "minLength" && <span>LastName is too short</span>}
                    {errors.lastName?.type === "maxLength" && <span>LastName is too long</span>}
                    {errors.lastName?.type === "required" && <span>LastName is Missing</span>}
                </span><br />



                <span className="op">
                    <TextField id="standard-basic" variant="standard" type="password" label="Password"  {...register('password', { required: true, minLength: 6, maxLength: 8 })}
                    // InputProps={{ startAdornment: (<InputAdornment position="start" > <IconButton ><VisibilityIcon /></IconButton> </InputAdornment>), }}
                    />
                    {errors.password?.type === "required" && <span>Password is Missing</span>}
                    {errors.password?.type === "minLength" && <span>Password is too short</span>}
                    {errors.password?.type === "maxLength" && <span>Password is too long</span>}
                </span><br />



                <Button variant="contained" type='submit'
                    color="secondary"
                    endIcon={<SendIcon />}
                    onClick={() => { navigate('/') }}>
                    {/* //check if existing */}
                    {/* //update state with cuurrent user */}
                    Send
                </Button>



            </form>

        </div>

    </div >

    function getComponent() {





    }
}
export default LogIn;
