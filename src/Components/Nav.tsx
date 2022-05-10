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
function Nav(): JSX.Element {
    return (
        <div className="Nav" >
            <ul>
                <Link to='/PurchaseList' className="nav-links" >
                    {/* <HomeRoundedIcon></HomeRoundedIcon> */}
                    {/* get count from state */}
                    <li className="nav-links"><CustomizedBadges count={2} /></li>

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

export default Nav;