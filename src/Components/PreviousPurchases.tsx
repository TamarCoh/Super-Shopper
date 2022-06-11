import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import { Button } from '@mui/material';
import {  useNavigate, useLocation, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./PreviousPurchases.css";
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ProductByMount, ProductByCategory } from "../utils/modals";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { JsxElement } from 'typescript';
import axios from 'axios';
import Logo from './Logo';
import { useSelector } from 'react-redux';

interface IpreviosPurchase {
    orderId: string;
    orderDate: Date;
    orderHebrewDate: string;
    orderDescription: String;
}

export default function PreviosPurchases() {
    const user = useSelector((st: any) => st.Use.state)
    async function getPreviouses() {
        let previosesList: IpreviosPurchase[] = [];
        try {
            const res = await axios.get(`https://localhost:44378/api/GetAllPurchasesHistoryByCustomerId/${user.id}`);

            previosesList = res.data.map((item: any) => {
                let previous: IpreviosPurchase
                previous = {
                    orderId: item.PurchasesHistoryId,
                    orderDate: item.PurchaseDate,
                    orderHebrewDate: item.HebrewDateId,
                    orderDescription: item.Description,
                }
                return previous as IpreviosPurchase
            })
        } catch (err) {
            previosesList = [];
            console.log("previouses catch: " + err);
        }
        return previosesList;
    }
    const navigate = useNavigate();
    const [arr, setArr] = React.useState<IpreviosPurchase[]>();
    const ref = React.useRef<HTMLDivElement>(null);
    async function anyNameFunction() {
        const tempPreviouses = await getPreviouses();

        setArr(tempPreviouses);
    }
    anyNameFunction();

    return (
        <>
            <div id="wrap">
                {arr == null ? <span>... בחיפוש אחר קניותיך הקודמות</span> : arr.map((item: IpreviosPurchase) => (
                    <div className='basicCard'>
                        <BasicCard  {...item} />
                    </div>
                ))}
            </div>

            <Button className="previosToProducts" color="primary" startIcon={<ReplyRoundedIcon />} onClick={() => { navigate('/allCategory') }}>למוצרים</Button>
            <Button className="previoustoPurchase" color="primary" startIcon={<ReplyRoundedIcon />} onClick={() => { navigate('/purchaseList') }}>להצעת קניה</Button>
            <Logo class_name={"logo-small"} />
        </>

    )
}


// const bull = (
//     <Box
//         component="span"
//         sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//     >
//         •
//     </Box>
// );
interface INavigateProps {
    orderId: number
}

// export function BasicCard(props: IpreviosPurchase) {
//     const navigate = useNavigate();
//     return (

//         <Card sx={{ maxWidth: 275 }}>
//             <CardContent>
//                 <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//                     {props.orderId}
//                 </Typography>
//                 <Typography variant="h5" component="div">
//                     {new Date(props.orderDate).getDay()}/{new Date(props.orderDate).getMonth()}/{new Date(props.orderDate).getFullYear()}
//                     {/* {new Date(props.orderDate).getDate()} */}
//                 </Typography>
//                 <Typography sx={{ mb: 1.5 }} color="text.secondary">
//                     {new Date(props.orderDate).getHours()}{":" + new Date(props.orderDate).getMinutes()}
//                 </Typography>
//                 <Typography variant="body2">
//                     {/* {props.orderDate.getDate()} */}
//                     {props.orderDescription}
//                     <br />
//                 </Typography>
//             </CardContent>
//             <CardActions>
//                 {/* <Button size="small" onClick={() => { navigate('./orderDetails', { state: { orderId: props.orderId } }) }}>show order products</Button> */}
//                  {/* <Button size="small" onClick={() => { AllOOrderDetails(props.orderId) }}> */}
//                  <Button size="small" onClick={() => {const List= AllOOrderDetails(props.orderId) ;    navigate('/purchaselistToSave', { state: List })}}>
//                      show order products</Button>

//             </CardActions>
//         </Card>

//     );
// }
export function BasicCard(props: IpreviosPurchase) {
    const navigate = useNavigate();
    const [List,setList]=React.useState<ProductByMount[]>([]);
    async function getProducts(orderId:string) {
        const res = await axios.get(`api/GetActuallyPurchasesByPurchaseHistoryId/${orderId}`);
        debugger
        const list:ProductByMount[]= res.data.map((item: any) => {
            let product: ProductByMount
            product = {
                idrow: "",
                id: item.id,
                name: item.name,
                // category: number,
                PurchasesHistoryId: "",
                PurchasePrognosisId: "",
                amount: item.amount
            }
            return product as ProductByMount
        })
        setList(list)
    }
    return (

        <Card sx={{ maxWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {props.orderId}
                </Typography>
                <Typography variant="h5" component="div">
                    {new Date(props.orderDate).getDay()}/{new Date(props.orderDate).getMonth()}/{new Date(props.orderDate).getFullYear()}
                    {/* {new Date(props.orderDate).getDate()} */}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {new Date(props.orderDate).getHours()}{":" + new Date(props.orderDate).getMinutes()}
                </Typography>
                <Typography variant="body2">
                    {/* {props.orderDate.getDate()} */}
                    {props.orderDescription}
                    <br />
                </Typography>
            </CardContent>
            <CardActions>
                {/* <Button size="small" onClick={() => { navigate('./orderDetails', { state: { orderId: props.orderId } }) }}>show order products</Button> */}
                 <Button size="small" onClick={() => {getProducts(props.orderId) ;    navigate('/purchaselistToSave', { state: List })
 }}>show order products</Button>


            </CardActions>
        </Card>

    );
}

function AllOOrderDetails(orderId:string){
    // const navigate=useNavigate();

const [List,setList]=React.useState<ProductByMount[]>([]);
    async function getProducts() {
        const res = await axios.get(`api/GetActuallyPurchasesByPurchaseHistoryId/${orderId}`);
        debugger
        const list:ProductByMount[]= res.data.map((item: any) => {
            let product: ProductByMount
            product = {
                idrow: "",
                id: item.id,
                name: item.name,
                // category: number,
                PurchasesHistoryId: "",
                PurchasePrognosisId: "",
                amount: item.amount
            }
            return product as ProductByMount
        })
        setList(list)
    }
    getProducts()
    // navigate('./orderDetails', { state: List })
    return List;
}
export function OrderDetails() {
debugger
    const location = useLocation()
    const from = location.state as INavigateProps
    const [List, setList] = React.useState<ProductByMount[]>([]);
    debugger
    async function getProducts() {
        const res = await axios.get(`api/GetActuallyPurchasesByPurchasesHistoryId/${from.orderId}`);
        
        // 
        const list: ProductByMount[] = res.data.map((item: any) => {
            let product: ProductByMount
            product = {
                idrow: "",
                id: item.id,
                name: item.name,
                // category: number,
                PurchasesHistoryId: "",
                PurchasePrognosisId: "",
                amount: item.amount
            }
            setList(list)
        })
    }
    const navigate = useNavigate();

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ maxWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>שם</TableCell>
                            <TableCell align="right">כמות</TableCell>
                            <TableCell align="right">קוד מוצר</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {List.map((row: ProductByMount) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.amount}</TableCell>
                                <TableCell align="right">{row.id}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button className="detailsToPreviouses" color="primary" startIcon={<ReplyRoundedIcon />} onClick={() => { navigate('/previousPurchases') }}>חזרה</Button>

        </>
    )
}



