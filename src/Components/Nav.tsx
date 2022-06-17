/* eslint-disable @typescript-eslint/no-unused-expressions */
import "./Nav.css";
import { Link } from "react-router-dom";
import * as React from "react";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { connect, useDispatch, useSelector } from "react-redux";
import { logIn, logOut } from "../store/Actions/User";
import { clearPurchaseList } from "../store/Actions/ProductInList";
import axios from "axios";
import { User } from "../utils/modals";
import Button from "@mui/material/Button";
import Popper from "@mui/material/Popper";
import { useForm } from "react-hook-form";
import { useState } from "react";
interface Icustomer {
  CustomerId: Number;
  FirstName: string;
  LastName: string;
  Password: string;
  Email: string;
}
async function updateUserDetails(props: User) {
  let customer: Icustomer;
  customer = {
    CustomerId: props.id,
    FirstName: props.firstName,
    LastName: props.lastName,
    Password: props.password,
    Email: props.email,
  };
  await axios
    .put(`https://localhost:44378/api/Customer/${customer}`)
    .then(() => {
      alert("עודכן בהצלחה");
    })
    .catch((res) => {
      alert("העדכון כשל"+res);
    });
}

export function SimplePopper() {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
  } = useForm<User>();

  const user = useSelector((st: any) => st.Use.state) as User;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [firstName, setInputFirstName] = useState(user.firstName);
  const [lastName, setInputLastName] = useState(user.lastName);
  const [password, setInputPassword] = useState("");
  const [email, setInputEmail] = useState("");

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  return (
    <div>
      <Button className="nav-links" id="update-details" onClick={handleClick}>
        עריכה
      </Button>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <form
          onSubmit={() => {
            debugger;
            const u = {
              id: user.id,
              firstName: firstName === "" ? user.firstName : firstName,
              lastName: lastName === "" ? user.lastName : lastName,
              password: password === "" ? user.password : password,
              email: email === "" ? user.email : email,
            } as User;
            updateUserDetails(u);
            dispatch(logIn(u));
            localStorage.setItem("user", JSON.stringify(u));
            handleClick;
          }}
        >
          <input
            type="text"
            placeholder={"שם: " + user.firstName}
            {...register("firstName", {
              required: true,
              minLength: 2,
              maxLength: 10,
            })}
            onChange={(event) => setInputFirstName(event.target.value)}
          ></input>
          <span className="op">
            {errors.firstName?.type === "required" && <span>חסר שם פרטי</span>}
            {errors.firstName?.type === "minLength" && (
              <span>שם פרטי קצר מדי</span>
            )}
            {errors.firstName?.type === "maxLength" && (
              <span>שם פרטי ארוך מדי</span>
            )}
          </span>
          <input
            type="text"
            placeholder={"משפחה: " + user.lastName}
            {...register("lastName", {
              required: true,
              minLength: 2,
              maxLength: 10,
            })}
            onChange={(event) => setInputLastName(event.target.value)}
          ></input>
          <span className="op">
            {errors.lastName?.type === "minLength" && (
              <span>שם משפחה קצר מדי</span>
            )}
            {errors.lastName?.type === "maxLength" && (
              <span>שם משפחה ארוך מדי</span>
            )}
            {errors.lastName?.type === "required" && <span>חסר שם משפחה</span>}
          </span>
          <input
            type="password"
            placeholder={"סיסמא: " }
            {...register("password", {
              required: true,
              minLength: 2,
              maxLength: 10,
            })}
            onChange={(event) => setInputPassword(event.target.value)}
          ></input>
          <span className="op">
            {errors.password?.type === "required" && <span>חסרה סיסמה</span>}
            {errors.password?.type === "minLength" && (
              <span>סיסמה קצרה מדי</span>
            )}
            {errors.password?.type === "maxLength" && (
              <span>סיסמה ארוכה מדי</span>
            )}
          </span>
          <input
            type="email"
            placeholder={"מייל: "}
            {...register("email", {
              required: true,
              minLength: 2,
              maxLength: 10,
            })}
            onChange={(event) => setInputEmail(event.target.value)}
          ></input>
          <Button type="submit">עדכן פרטים</Button>
        </form>
      </Popper>
    </div>
  );
}

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
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
  const [pDate, setPDate] = useState("");
  setTimeout(() => {
    setPDate(" " + new Date().toLocaleString() + " ");
  }, 1000);
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  // const user = useSelector((st: any) => st.Use.state) as User;
  const [currentDtaeTime, setCurrentDateTime] = useState<string>("");
  React.useEffect(() => {
    async function f() {
      // let resGet =
      await axios
        .get("https://localhost:44378/api/GetCurrentJewishHebrewDate")
        .then((res) => {
          let d = res.data;
          setCurrentDateTime(d);
        })
        .catch(() => {
          setCurrentDateTime("failed");
        });
    }
    f();
  });

  return (
    <div className="Nav">
      <ul>
        <Link to="/PurchaseList" className="nav-links">
          {/* get count from state */}
          <li className="nav-links">
            <CustomizedBadges count={props.count} />
          </li>
        </Link>
        <Link to="/" className="nav-links">
          <li className="nav-links">כניסה</li>
        </Link>
        <Link to="/allCategory" className="nav-links">
          <li className="nav-links">מוצרים</li>
        </Link>
        <li className="nav-links">
          {props.user != null ? (
            <>
              <li className="nav-links" id="currentUser">
                {props.user.firstName + " " + props.user.lastName}
              </li>
              <div id="div-nav">
                <div>
                  <li
                    className="nav-links"
                    id="nav-logIn"
                    onClick={() => {
                      localStorage.removeItem("user");
                      localStorage.removeItem("productList");
                      dispatch(logOut());
                      dispatch(clearPurchaseList());
                    }}
                  >
                    התנתקות
                  </li>
                  <li className="nav-links" id="nav-logIn">
                    <SimplePopper />
                  </li>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
          <li className="nav-links" id="currentDate">
            {currentDtaeTime + "  /  "}
            {" " + pDate + "   "}
          </li>
        </li>
      </ul>
    </div>
  );
}

const mapStateToProps = (st: any) => {
  return {
    count: st.pro.amountProducts,
    user: st.Use.state,
  };
};
export default connect(mapStateToProps)(Nav);
