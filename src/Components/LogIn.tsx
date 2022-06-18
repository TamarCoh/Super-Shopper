
import { TextField, Button } from "@material-ui/core";
import "./SignIn.css";
import * as React from "react";
import SendIcon from "@mui/icons-material/Send";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ProductByMount, User } from "../utils/modals";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../store/Actions/User";
import { getPurchaseList } from "../store/Actions/ProductInList";
import { IstatePro } from "../store/Reducers/ProductInList";
import { randomId } from "@mui/x-data-grid-generator";

export async function getList(payload: User) {
  let prognosis: IstatePro = {} as IstatePro;
  prognosis.amountProducts = 0;
  prognosis.productsList = [];
  await axios
    .get(`https://localhost:44378/api/GetPurchaseOffer/${payload.id}`)
    .then((response) => {
      prognosis.productsList = response.data.map((p: any) => {
        let product: ProductByMount;
        product = {
          idrow: randomId(),
          id: p.ProductId,
          name: p.Name,
          PurchasesHistoryId: p.PurchasesHistoryId,
          PurchasePrognosisId: p.PurchasePrognosisId,
          amount: p.Amount,
          description: p.Description,
          img: p.Image,
        };
        return product as ProductByMount;
      });
      prognosis.amountProducts = response.data.length
        ? response.data.length
        : 0;
    });

  return prognosis as IstatePro;
}

export function LogIn(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const addCustomer = async (data: User) => {
    try {
        debugger
      console.log("start");
      console.log(data);
       await axios
        .get(
          `https://localhost:44378/api/GetCustomerByPasswordName/${data.password}/${data.firstName}/${data.lastName}`
        )
        .then(async (response) => {
          if (response.data == null) {
            console.log("לקוח לא קיים");
            navigate("/SignUp");
          }
          
          let user: User;
          user = {
            firstName: response.data.FirstName,
            lastName: response.data.LastName,
            id: response.data.CustomerId,
            password: response.data.Password,
            email: response.data.Email,
          };
          localStorage.setItem("user", JSON.stringify(user));
          console.log("user :   " + { user });
          dispatch(logIn(user));
          const list: IstatePro = (await getList(user)) as IstatePro;

          localStorage.setItem("productList", JSON.stringify(list));
          dispatch(getPurchaseList(list));
        })
        .then(() => {
          navigate("", { state: { isOpen: false } });
        });
    } catch {
      console.log(errors);
      alert("אינך רשום ,אנא עבור לרישום");
    }
    // <Stack sx={{ width: '100%' }} spacing={2}>
    //     <Alert variant="filled" severity="success">
    //         This is a success alert — check it out!
    //     </Alert>
    // </Stack>
  };
  return (
    <>
      <div className="card">
        <h1>התחברות</h1>
        <form onSubmit={handleSubmit(addCustomer)}>
          <span className="op">
            <TextField
              id="standard-basic"
              variant="standard"
              type="text"
              label="שם פרטי"
              {...register("firstName", {
                required: true,
                minLength: 2,
                maxLength: 10,
              })}
            />
            {errors.firstName?.type === "required" && <span>חסר שם פרטי</span>}
            {errors.firstName?.type === "minLength" && (
              <span>שם פרטי קצר מדי</span>
            )}
            {errors.firstName?.type === "maxLength" && (
              <span>שם פרטי ארוך מדי</span>
            )}
          </span>
          <br />
          <span className="op">
            <TextField
              id="standard-basic"
              variant="standard"
              type="text"
              label="שם משפחה"
              {...register("lastName", {
                required: true,
                minLength: 2,
                maxLength: 10,
              })}
            />
            {errors.lastName?.type === "minLength" && (
              <span>שם משפחה קצר מדי</span>
            )}
            {errors.lastName?.type === "maxLength" && (
              <span>שם משפחה ארוך מדי</span>
            )}
            {errors.lastName?.type === "required" && <span>חסר שם משפחה</span>}
          </span>
          <br />

          <span className="op">
            <TextField
              id="standard-basic"
              variant="standard"
              type="password"
              label="סיסמה"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 8,
              })}
            />
            {errors.password?.type === "required" && <span>חסרה סיסמה</span>}
            {errors.password?.type === "minLength" && (
              <span>סיסמה קצרה מדי</span>
            )}
            {errors.password?.type === "maxLength" && (
              <span>סיסמה ארוכה מדי</span>
            )}
          </span>
          <br />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            endIcon={<SendIcon />}
          >
            {/* //check if existing */}
            {/* //update state with cuurrent user */}
            שלח
          </Button>
        </form>
      </div>
    </>
  );
}
export default LogIn;
