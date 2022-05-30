import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import { Button } from '@mui/material';
import { Navigate, useNavigate, useLocation, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
    orderDescription: String;
    // orderProducts: ProductByMount[];

}

export default function PreviosPurchases() {
    const user = useSelector((st: any) => st.Use.state)
    async function getPreviouses() {
        let previosesList: IpreviosPurchase[] = [];
        try {
            const res = await axios.get(`https://localhost:44378/api/PurchasesHistory/${user.id}`);
            debugger
            previosesList = res.data.map((item: any) => {
                let previous: IpreviosPurchase
                previous = {
                    orderId: item.PurchasesHistoryId,
                    orderDate: item.PurchaseDate,
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
        debugger
        setArr(tempPreviouses);
    }
    anyNameFunction();

    return (
        <>
            <div id="wrap">
                {arr == null ? <span> לא נמצאו קניות קודמות...</span> : arr.map((item: IpreviosPurchase) => (
                    <div className='basicCard'>
                        <BasicCard  {...item} />
                    </div>
                ))}
            </div>

            <Button className="previosToProducts" color="primary" startIcon={<ReplyRoundedIcon />} onClick={() => { navigate('/allCategory') }}>מוצרים</Button>
            <Button className="previoustoPurchase" color="primary" startIcon={<ReplyRoundedIcon />} onClick={() => { navigate('/purchaseList') }}>רשימת מוצרים</Button>
            <Logo class_name={"logo-small"} />
        </>

    )
}


const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);
interface INavigateProps {
    orderId: number
}

export function BasicCard(props: IpreviosPurchase) {
    const navigate = useNavigate();
    return (

        <Card sx={{ maxWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {props.orderId}
                </Typography>
                <Typography variant="h5" component="div">
                    {/* {props.orderDate.getDay()*/}{/*bull*/}{/*props.orderDate.getMonth()*/}{/*bull*/}{/*props.orderDate.getFullYear()} */}
                    {new Date(props.orderDate).getDate()}
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
                <Button size="small" onClick={() => { navigate('./orderDetails', { state: { orderId: props.orderId } }) }}>show order products</Button>
            </CardActions>
        </Card>
 
    );
}

export function OrderDetails() {

    const location = useLocation()
    const from = location.state as INavigateProps
const [List,setList]=React.useState<ProductByMount[]>([]);
    async function getProducts() {
        const res = await axios.get(`api/GetActuallyPurchasesByPurchaseHistoryId/${from.orderId}`);
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
            setList(list)
        })
    }
const navigate=useNavigate();
    debugger
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



