import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./PreviousPurchases.css";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ProductByMount } from "../utils/modals";
import axios from "axios";
import Logo from "./Logo";
import { useSelector } from "react-redux";

interface IpreviosPurchase {
  orderId: string;
  orderDate: Date;
  orderHebrewDateId: string;
  orderDescription: String;
}

export default function PreviosPurchases() {
  const user = useSelector((st: any) => st.Use.state);
  async function getPreviouses() {
    let previosesList: IpreviosPurchase[] = [];
    try {
      const res = await axios.get(
        `https://localhost:44378/api/GetAllPurchasesHistoryByCustomerId/${user.id}`
      );

      previosesList = res.data.map((item: any) => {
        let previous: IpreviosPurchase;
        previous = {
          orderId: item.PurchasesHistoryId,
          orderDate: item.PurchaseDate,
          orderHebrewDateId: item.HebrewDateId,
          orderDescription: item.Description,
        };
        return previous as IpreviosPurchase;
      });
    } catch (err) {
      previosesList = [];
      console.log("previouses catch: " + err);
    }
    return previosesList;
  }
  const navigate = useNavigate();
  const [arr, setArr] = React.useState<IpreviosPurchase[]>();
  async function anyNameFunction() {
    const tempPreviouses = await getPreviouses();
    setArr(tempPreviouses);
  }
  anyNameFunction();
  return (
    <>
      <div id="wrap">
        {arr == null ? (
          <span>... בחיפוש אחר קניותיך הקודמות</span>
        ) : (
          arr.map((item: IpreviosPurchase) => (
            <div className="basicCard">
              <BasicCard {...item} />
            </div>
          ))
        )}
      </div>
      <Button
        className="previosToProducts"
        color="primary"
        startIcon={<ReplyRoundedIcon />}
        onClick={() => {
          navigate("/allCategory");
        }}
      >
        למוצרים
      </Button>
      <Button
        className="previoustoPurchase"
        color="primary"
        startIcon={<ReplyRoundedIcon />}
        onClick={() => {
          navigate("/purchaseList");
        }}
      >
        להצעת קניה
      </Button>
      <Logo class_name={"logo-small"} />
    </>
  );
}
export function BasicCard(props: IpreviosPurchase) {
  const navigate = useNavigate();
  async function getProducts(orderId: string) {
    debugger;
    const res = await axios.get(
      `https://localhost:44378/api/GetActuallyPurchasesByPurchasesHistoryId/${orderId}`
    );
    debugger;
    let list: ProductByMount[] = [];
    list = await res.data.map((item: any) => {
      let product: ProductByMount;
      product = {
        idrow: "",
        id: item.ProductId,
        name: item.Name,
        PurchasesHistoryId: "",
        PurchasePrognosisId: "",
        amount: item.Amount,
        description: item.Description,
        img: item.Image,
      };
      return product as ProductByMount;
    });
    debugger;
    return list;
  }
  const [hebrewDate, setHebrewDate] = React.useState("");
  async function convertIdToHebrewDate() {
    const res = await await axios.get(
      `https://localhost:44378/api/GetJewishHebrewDateByForeignDate/${props.orderId}`
    );
    setHebrewDate(res.data);
  }
  convertIdToHebrewDate();
  return (
    <Card sx={{ maxWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.orderId}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {hebrewDate}
        </Typography>
        <Typography variant="h5" component="div">
          {new Date(props.orderDate).getDay()}/
          {new Date(props.orderDate).getMonth()}/
          {new Date(props.orderDate).getFullYear()}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {new Date(props.orderDate).getHours()}
          {":" + new Date(props.orderDate).getMinutes()}
        </Typography>
        <Typography variant="body2">
          {props.orderDescription}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={async () => {
            let currentPurchaseProducts: ProductByMount[];
            currentPurchaseProducts = await getProducts(props.orderId);
            navigate("/purchaselistToSave", {
              state: {
                p: currentPurchaseProducts,
                pd: new Date(props.orderDate).toLocaleString() + " ",
                hd: hebrewDate,
              },
            });
          }}
        >
          show order products
        </Button>
      </CardActions>
    </Card>
  );
}

// function AllOOrderDetails(orderId: string) {
//   // const navigate=useNavigate();

//   const [List, setList] = React.useState<ProductByMount[]>([]);
//   async function getProducts() {
//     const res = await axios.get(
//       `https://localhost:44378/api/GetActuallyPurchasesByPurchaseHistoryId/${orderId}`
//     );
//     debugger;
//     const list: ProductByMount[] = res.data.map((item: any) => {
//       let product: ProductByMount;
//       product = {
//         idrow: "",
//         id: item.ProductId,
//         name: item.Name,
//         // category: number,
//         PurchasesHistoryId: "",
//         PurchasePrognosisId: "",
//         amount: item.Amount,
//         description: item.Description,
//         img: item.Image,
//       };
//       return product as ProductByMount;
//     });
//     setList(list);
//   }
//   getProducts();
//   // navigate('./orderDetails', { state: List })
//   return List;
// }
// export function OrderDetails() {
//   debugger;
//   const location = useLocation();
//   const from = location.state as INavigateProps;
//   const [List, setList] = React.useState<ProductByMount[]>([]);
//   debugger;
//   async function getProducts() {
//     const res = await axios.get(
//       `https://localhost:44378/api/GetActuallyPurchasesByPurchasesHistoryId/${from.orderId}`
//     );

//     //
//     const list: ProductByMount[] = res.data.map((item: any) => {
//       let product: ProductByMount;
//       product = {
//         idrow: "",
//         id: item.ProductId,
//         name: item.Name,
//         // category: number,
//         PurchasesHistoryId: "",
//         PurchasePrognosisId: "",
//         amount: item.Amount,
//         description: item.Description,
//         img: item.Image,
//       };
//       setList(list);
//     });
//   }
//   const navigate = useNavigate();

//   return (
//     <>
//       <TableContainer component={Paper}>
//         <Table sx={{ maxWidth: 650 }} size="small" aria-label="a dense table">
//           <TableHead>
//             <TableRow>
//               <TableCell>שם</TableCell>
//               <TableCell align="right">כמות</TableCell>
//               <TableCell align="right">קוד מוצר</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {List.map((row: ProductByMount) => (
//               <TableRow
//                 key={row.name}
//                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//               >
//                 <TableCell component="th" scope="row">
//                   {row.name}
//                 </TableCell>
//                 <TableCell align="right">{row.amount}</TableCell>
//                 <TableCell align="right">{row.id}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Button
//         className="detailsToPreviouses"
//         color="primary"
//         startIcon={<ReplyRoundedIcon />}
//         onClick={() => {
//           navigate("/previousPurchases");
//         }}
//       >
//         חזרה
//       </Button>
//     </>
//   );
// }
