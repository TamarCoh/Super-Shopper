import "./Nav.css";
import { Link } from "react-router-dom";
// import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
// import SettingsIcon from '@mui/icons-material/Settings';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
import * as React from 'react';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import connect from "react-redux/es/components/connect";
import { connect } from "react-redux";
import { count } from "console";

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
function Nav(props:any): JSX.Element {
    return (
        <div className="Nav" >
            <ul>
                <Link to='/PurchaseList' className="nav-links" >
                    {/* <HomeRoundedIcon></HomeRoundedIcon> */}
                    {/* get count from state */}
                    <li className="nav-links"><CustomizedBadges count={props.count} /></li>

                </Link>
                <Link to='/' className="nav-links" >
                    {/* <HomeRoundedIcon></HomeRoundedIcon> */}
                    <li className="nav-links">Home</li>
                </Link>

                {/* <Link to='/signUp' className="nav-links" >
                   
                    <li className="nav-links">SignUp</li>
                </Link> */}
                <Link to='/allCategory' className="nav-links" >
                    {/* <AddCircleOutlineIcon></AddCircleOutlineIcon> */}
                    <li className="nav-links">AllProducts</li>
                </Link>

                <Link to='/logIn' className="nav-links" id="nav-logIn">
                    {/* <AddCircleOutlineIcon></AddCircleOutlineIcon> */}
                    <li className="nav-links" >LogIn</li>
                </Link>
            </ul>
        </div >
    );
}
const mapStateToProps = (st: any) => {
    //הפונקציה תחזיר אובייקט ובו כל השדות שאנו רוצים שייכנסו לפרופס של הקומםוננטה שלנו
    //מתןך הסטייט הכללי
    return {
        //  myArr: st.pro.productsList,
         count: st.pro.amountProducts
        // myArr:[]=[{d: 123,
        //     name: "name",
        //     category: 1,
        //     PurchasesHistoryId: "123",
        //     PurchasePrognosisId: "fgvhj",
        //     amount: 3}]
    };
}
export default connect(mapStateToProps)(Nav);