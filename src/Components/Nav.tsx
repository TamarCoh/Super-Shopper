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
import { logOut } from "../store/Actions/User";
import {clearPurchaseList} from '../store/Actions/ProductInList'
import axios from "axios";
import { User } from "../utils/modals";
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
    const user = useSelector((st: any) => st.Use.state)

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
                <li className="nav-links" id="currentUser">{props.user!=null?props.user.firstName+' '+props.user.lastName:''}</li>
                {props.user!=null?
                <div id="div-nav">
                 {/* <button className="nav-links" id="nav-logIn" > */}
                 <li className="nav-links" id="nav-logIn" onClick={() => {localStorage.removeItem('user');localStorage.removeItem('productList'); dispatch(logOut());dispatch(clearPurchaseList());}}>התנתקות</li>
                 <li className="nav-links" id="nav-logIn" onClick={async ()=>{
                    const p:User={}as User
                    p.id=props.user.id
                    p.firstName=""
                    p.lastName=""
                    p.email=""
                    p.password=""
                    await axios.get(`https://localhost:44378/api/Customer/${p}`);
                 }} >עריכה</li>
                 {/* </button> */}
                 </div>
                 :null}
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