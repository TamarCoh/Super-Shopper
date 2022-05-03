import "./Nav.css";
import { Link } from "react-router-dom";
// import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
// import SettingsIcon from '@mui/icons-material/Settings';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
function Nav(): JSX.Element {
    return (
        <div className="Nav">
            <ul>
                <Link to='/' className="nav-links" >
                    {/* <HomeRoundedIcon></HomeRoundedIcon> */}
                    <li className="nav-links">Home</li>

                </Link>

                {/* <Link to='/signUp' className="nav-links" >
                   
                    <li className="nav-links">SignUp</li>
                </Link> */}


                <Link to='/logIn' className="nav-links" >
                    {/* <AddCircleOutlineIcon></AddCircleOutlineIcon> */}
                    <li className="nav-links">LogIn</li>
                </Link>

                <Link to='/allProducts' className="nav-links" >
                    {/* <AddCircleOutlineIcon></AddCircleOutlineIcon> */}
                    <li className="nav-links">AllProducts</li>
                </Link>

            </ul>
        </div >
    );
}

export default Nav;