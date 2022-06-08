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
import { useDispatch } from "react-redux";
import { logIn, signUp } from "../store/Actions/User";
import { IstatePro } from "../store/Reducers/ProductInList";
import { getPurchaseList } from "../store/Actions/ProductInList";
import { getList } from "./LogIn";

export function SignUp(): JSX.Element {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm<User>();
    const addCustomer = async (data: User) => {

        console.log("start")
        console.log(data);
        let customerPromise = await axios.post("https://localhost:44378/api/Customer", data).
            then(async () => {
                let customer = await axios.get(`https://localhost:44378/api/GetCustomerByPasswordName/${data.password}/${data.firstName}/${data.lastName}`).
                    then(async response => {

                        //  let response = await customerPromise;
                        console.log(response.data);

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
                        dispatch(signUp(user))
                        const list: IstatePro = await getList(user) as IstatePro
                        localStorage.setItem('productList', JSON.stringify(list))
                        dispatch(getPurchaseList(list));
                    }).then(() => { navigate('/allCategory') })
            })
    }

    return <div >

        <div className="card">
            <h1>הרשמה</h1>

            <form id="sinUpForm" onSubmit={handleSubmit(addCustomer)}>

                <span className="op">
                    <TextField id="standard-basic" variant="standard" type="text" label="שם פרטי"   {...register('firstName', { required: true, minLength: 2, maxLength: 10 })}
                    // InputProps={{ startAdornment: (<InputAdornment position="start">  <AccountCircleIcon /> </InputAdornment>), }}
                    />
                    {errors.firstName?.type === "minLength" && <span>שם פרטי קצר מדי</span>}
                    {errors.firstName?.type === "maxLength" && <span>שם פרטי ארוך מדי</span>}
                    {errors.firstName?.type === "required" && <span>חסר שם פרטי</span>}
                </span><br />

                <span className="op">
                    <TextField id="standard-basic" variant="standard" type="text" label="שם משפחה"  {...register('lastName', { required: true, minLength: 2, maxLength: 10 })}
                    // InputProps={{ startAdornment: (<InputAdornment position="start">  <AccountCircleIcon /> </InputAdornment>), }}
                    />
                    {errors.lastName?.type === "required" && <span>חסר שם משפחה</span>}
                    {errors.lastName?.type === "minLength" && <span>שם משפחה קצר מדי</span>}
                    {errors.lastName?.type === "maxLength" && <span>שם משפחה ארוך מדי</span>}
                </span><br />



                <span className="op">
                    <TextField id="standard-basic" variant="standard" type="password" label="סיסמה"  {...register('password', { required: true, minLength: 6, maxLength: 8 })}
                    // InputProps={{ startAdornment: (<InputAdornment position="start" > <IconButton ><VisibilityIcon /></IconButton> </InputAdornment>), }}
                    />
                    {errors.password?.type === "required" && <span>חסרה סיסמה</span>}
                    {errors.password?.type === "minLength" && <span>סיסמה קצרה מדי</span>}
                    {errors.password?.type === "maxLength" && <span>סיסמה ארוכה מדי</span>}
                </span><br />

                <span className="op">
                    <TextField id="standard-basic" variant="standard" type="email" label="מייל" {...register('email', { required: true, minLength: 2, maxLength: 30 })}
                    // InputProps={{ startAdornment: (<InputAdornment position="start">  <AlternateEmailIcon /> </InputAdornment>), }}
                    />
                    {/* {errors.FirstName?.type === "required" && <span>firstName is Missing</span>}
                    {errors.FirstName?.type === "minLength" && <span>firstName is too short..</span>}
                    {errors.FirstName?.type === "minLength" && <span>firstName is too long..</span>} */}
                </span>

                <Button type="submit" variant="contained"
                    color="primary"
                    endIcon={<SendIcon />}>
                    הרשם
                </Button>
            </form>

        </div>

    </div >




}
export default SignUp

