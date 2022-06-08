/* eslint-disable @typescript-eslint/no-unused-expressions */
import "./Nav.css";
import { Link, useNavigate } from "react-router-dom";
// import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
// import SettingsIcon from '@mui/icons-material/Settings';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
import * as React from 'react';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import connect from "react-redux/es/components/connect";
import { connect, useDispatch, useSelector } from "react-redux";
import { count } from "console";
import Enter from "./Enter";
import { userInfo } from "os";
import { logIn, logOut } from "../store/Actions/User";
import { clearPurchaseList } from '../store/Actions/ProductInList'
import axios from "axios";
import { User } from "../utils/modals";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popper from '@mui/material/Popper';
// import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Input } from "@material-ui/core";
interface Icustomer{
    CustomerId:Number,
    FirstName:string,
    LastName:string,
    Password:string,
    Email:string
}
async function updateUserDetails(props:User) {
    debugger
    // public int CustomerId { get; set; }
    // public string FirstName { get; set; }
    // public string LastName { get; set; }
    // public string Password { get; set; }
    // public string Email { get; set; }
// PUT: api/Customer/5
let customer:Icustomer
customer={
    CustomerId:props.id,
    FirstName:props.firstName,
    LastName:props.lastName,
    Password:props.password,
    Email:props.email
}
await axios.put(`https://localhost:44378/api/Customer/${customer}`).then(()=>{
    alert("succeeded to update")
}).catch((res)=>{
    alert("didnt succeeded to update")
})
}

export function SimplePopper() {
const dispatch = useDispatch();

    const user = useSelector((st: any) => st.Use.state) as User
    
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;
    return (
        //type="button" aria-describedby={id} 
        <div>
            <Button className="nav-links" id="update-details" onClick={handleClick}>
                עריכה
            </Button>
            <Popper id={id} open={open} anchorEl={anchorEl}>
                {/* <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
          The content of the Popper.
        </Box> */}
                <form onSubmit={() => {
                    handleClick;
                     const u = {
                        id: user.id ,
                        firstName: "firstName",
                        lastName: "lastName",
                        password: "password",
                        email: "email"
                    } as User;
                     updateUserDetails(u);
                     dispatch(logIn(u));
                }}>


                    <input type="text" placeholder="first name" name="updateFirstName"></input>
                    <input type="text" placeholder="last name" name="updateLastName"></input>
                    <input type="password" placeholder="password" name="updatePassword"></input>
                    <input type="email" placeholder="email" name="updateEmail"></input>
                    <Button type="submit">עדכן פרטים</Button>
                </form>
            </Popper>
        </div>
    );
}

// import { indigo,pink,purple,blueGrey,red } from '@mui/material/colors';
// import { createTheme } from '@mui/material/styles';
// const theme = createTheme({
//     palette: {
//       primary: {
//         main: '#0d47a1',
//       },
//       secondary: {
//         main: '#c51162',
//       },
//     },
//   })
const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

function CustomizedBadges(props: any) {
    const count = props.count as number;
    return (
        <IconButton aria-label="cart">
            <StyledBadge badgeContent={count} color="primary">
                <ShoppingCartIcon />
            </StyledBadge>
        </IconButton>
    );
}
function Nav(props: any): JSX.Element {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((st: any) => st.Use.state) as User

    return (
        // <ThemeProvider theme={theme}>
        <div className="Nav">
            <ul>
                <Link to='/PurchaseList' className="nav-links" >
                    {/* <HomeRoundedIcon></HomeRoundedIcon> */}
                    {/* get count from state */}
                    <li className="nav-links"><CustomizedBadges count={props.count} /></li>

                </Link>
                <Link to='/' className="nav-links" >
                    {/* <HomeRoundedIcon></HomeRoundedIcon> */}
                    <li className="nav-links">כניסה</li>
                </Link>
                <Link to='/allCategory' className="nav-links" >
                    {/* <AddCircleOutlineIcon></AddCircleOutlineIcon> */}
                    <li className="nav-links">מוצרים</li>
                </Link>
                {/* <Link to='/logIn' className="nav-links" id="nav-logIn">
                    {/* <AddCircleOutlineIcon></AddCircleOutlineIcon> */}

                {/* </Link> */}
                <li className="nav-links" id="currentUser">{props.user != null ? props.user.firstName + ' ' + props.user.lastName : ''}</li>
                {props.user != null ?
                    <div id="div-nav">
                        {/* <button className="nav-links" id="nav-logIn" > */}
                        <li className="nav-links" id="nav-logIn" onClick={
                            () => {
                                localStorage.removeItem('user');
                                localStorage.removeItem('productList');
                                dispatch(logOut());
                                dispatch(clearPurchaseList());
                            }}>התנתקות</li>
                        {/* <li className="nav-links" id="nav-logIn" onClick={async ()=>{
                    const p:User={}as User
                    p.id=props.user.id
                    p.firstName=""
                    p.lastName=""
                    p.email=""
                    p.password=""
                    await axios.put(`https://localhost:44378/api/Customer/${p}`);
                 }} >עריכה</li> */}
                        <li className="nav-links" id="nav-logIn"><SimplePopper /></li>
                        {/* </button> */}
                    </div>
                    : null}
                {/* <button className="nav-links" id="nav-logIn" onClick={() => navigate('/logIn')}>
                    <li className="nav-links" id="nav-logIn" >התחברות</li>
                </button> */}
            </ul >
        </div >
        // </ThemeProvider>
    );
}

const mapStateToProps = (st: any) => {
    //הפונקציה תחזיר אובייקט ובו כל השדות שאנו רוצים שייכנסו לפרופס של הקומםוננטה שלנו
    //מתןך הסטייט הכללי
    return {
        //  myArr: st.pro.productsList,
        count: st.pro.amountProducts,
        user: st.Use.state
        // myArr:[]=[{d: 123,
        //     name: "name",
        //     category: 1,
        //     PurchasesHistoryId: "123",
        //     PurchasePrognosisId: "fgvhj",
        //     amount: 3}]
    };
}
export default connect(mapStateToProps)(Nav);


