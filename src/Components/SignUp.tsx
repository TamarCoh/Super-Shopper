import { Component } from "react";
import { JsxElement } from "typescript";
import { Box, FormControl, TextField, InputAdornment, Button } from "@material-ui/core";
import { send } from "process";
import Send from "@mui/icons-material";
import './SignIn.css';
import { render } from "@testing-library/react";
import SendIcon from '@mui/icons-material/Send';
import { useForm } from "react-hook-form";
import axios from "axios";
// import Customer from "./Customer";
import { User } from "../utils/modals";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from '@mui/icons-material/Visibility';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";

export function SignUp(): JSX.Element {
    const navigate = useNavigate();
    // const url = "https://localhost:44378/";
    const { register, handleSubmit, formState: { errors } } = useForm<User>();
    const addCustomer = async (data: User) => {

        console.log("start")
        console.log(data);
        let customerPromise = axios.post("https://localhost:44378/api/Customer", data);
        let response = await customerPromise;
        console.log(response.data);
        navigate('/PurchaseList')
    }
    return <div >

        <div className="card">
            <h1>Sign Up</h1>

            <form onSubmit={handleSubmit(addCustomer)}>

                <span className="op">
                    <TextField id="standard-basic" variant="standard" type="text" label="firstname"   {...register('firstName', { required: true, minLength: 2, maxLength: 10 })}
                    // InputProps={{ startAdornment: (<InputAdornment position="start">  <AccountCircleIcon /> </InputAdornment>), }}
                    />
                    {errors.firstName?.type === "minLength" && <span>FirstName is too short</span>}
                    {errors.firstName?.type === "maxLength" && <span>FirstName is too long</span>}
                    {errors.firstName?.type === "required" && <span>FirstName is Missing</span>}
                </span><br />

                <span className="op">
                    <TextField id="standard-basic" variant="standard" type="text" label="lastname"  {...register('lastName', { required: true, minLength: 2, maxLength: 10 })}
                    // InputProps={{ startAdornment: (<InputAdornment position="start">  <AccountCircleIcon /> </InputAdornment>), }}
                    />
                    {errors.lastName?.type === "required" && <span>LastName is Missing</span>}
                    {errors.lastName?.type === "minLength" && <span>LastName is too short</span>}
                    {errors.lastName?.type === "maxLength" && <span>LastName is too long</span>}
                </span><br />



                <span className="op">
                    <TextField id="standard-basic" variant="standard" type="password" label="password"  {...register('password', { required: true, minLength: 6, maxLength: 8 })}
                    // InputProps={{ startAdornment: (<InputAdornment position="start" > <IconButton ><VisibilityIcon /></IconButton> </InputAdornment>), }}
                    />
                    {errors.password?.type === "required" && <span>Password is Missing</span>}
                    {errors.password?.type === "minLength" && <span>Password is too short</span>}
                    {errors.password?.type === "maxLength" && <span>Password is too long</span>}
                </span><br />

                <span className="op">
                    <TextField id="standard-basic" variant="standard" type="email" label="email" {...register('email', { required: true, minLength: 2, maxLength: 30 })}
                    // InputProps={{ startAdornment: (<InputAdornment position="start">  <AlternateEmailIcon /> </InputAdornment>), }}
                    />
                    {/* {errors.FirstName?.type === "required" && <span>firstName is Missing</span>}
                    {errors.FirstName?.type === "minLength" && <span>firstName is too short..</span>}
                    {errors.FirstName?.type === "minLength" && <span>firstName is too long..</span>} */}
                </span>

                <Button type="submit" variant="contained"
                    color="secondary"
                    endIcon={<SendIcon />}>
                    Register
                </Button>
            </form>

        </div>

    </div >




}
export default SignUp

