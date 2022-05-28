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

interface IpreviosPurchase {
    orderId: string;
    orderDate: Date;
    orderDescription: String;
    // orderProducts: ProductByMount[];

}
async function getPreviouses() {
    let previosesList: IpreviosPurchase[] = [];
    try {
        const res = await axios.get(`https://localhost:44378/api/PurchasesHistory/${5}`);
        debugger
        previosesList = res.data.map((item: any) => {
            let previous: IpreviosPurchase
            previous = {
                orderId: item.PurchasesHistoryId,
                orderDate: item.PurchaseDate,
                orderDescription: item.Description,
                // OrderDetails: item. ;
            }
            return previous as IpreviosPurchase
        })
    } catch (err) {
        previosesList = [];
        console.log("previouses catch: " + err);
    }
    return previosesList;
    // return mockupCategoriesList;
}
export default function PreviosPurchases() {
    const navigate = useNavigate();
    const [arr, setArr] = React.useState<IpreviosPurchase[]>();
    const ref = React.useRef<HTMLDivElement>(null);
    async function anyNameFunction() {
        const tempPreviouses = await getPreviouses();
        debugger
        setArr(tempPreviouses);
    }
    anyNameFunction();
    // = [
    //     {
    //         orderName: "first",
    //         orderDate: new Date(),
    //         orderMail: "orabenesh@gmail.com",
    //         orderProducts: [
    //             {
    //                 idrow: "dgsa",
    //                 id: 123,
    //                 name: "bread",
    //                 category: 1,
    //                 PurchasesHistoryId: "45",
    //                 PurchasePrognosisId: "63",
    //                 amount: 1
    //             },
    //             {
    //                 idrow: "bhj",
    //                 id: 122,
    //                 name: "milk",
    //                 category: 2,
    //                 PurchasesHistoryId: "45",
    //                 PurchasePrognosisId: "63",
    //                 amount: 3
    //             }
    //         ]
    //     },
    //     {
    //         orderName: "second",
    //         orderDate: new Date(),
    //         orderMail: "orabenesh@gmail.com",
    //         orderProducts: [
    //             {
    //                 idrow: "dgsa",
    //                 id: 123,
    //                 name: "bread",
    //                 category: 1,
    //                 PurchasesHistoryId: "45",
    //                 PurchasePrognosisId: "63",
    //                 amount: 1
    //             },
    //             {
    //                 idrow: "bhj",
    //                 id: 122,
    //                 name: "milk",
    //                 category: 2,
    //                 PurchasesHistoryId: "45",
    //                 PurchasePrognosisId: "63",
    //                 amount: 3
    //             }
    //         ]
    //     }, {
    //         orderName: "third",
    //         orderDate: new Date(),
    //         orderMail: "orabenesh@gmail.com",
    //         orderProducts: [
    //             {
    //                 idrow: "dgsa",
    //                 id: 123,
    //                 name: "bread",
    //                 category: 1,
    //                 PurchasesHistoryId: "45",
    //                 PurchasePrognosisId: "63",
    //                 amount: 1
    //             },
    //             {
    //                 idrow: "bhj",
    //                 id: 122,
    //                 name: "milk",
    //                 category: 2,
    //                 PurchasesHistoryId: "45",
    //                 PurchasePrognosisId: "63",
    //                 amount: 3
    //             }
    //         ]
    //     }, {
    //         orderName: "fourth",
    //         orderDate: new Date(),
    //         orderMail: "orabenesh@gmail.com",
    //         orderProducts: [
    //             {
    //                 idrow: "dgsa",
    //                 id: 123,
    //                 name: "bread",
    //                 category: 1,
    //                 PurchasesHistoryId: "45",
    //                 PurchasePrognosisId: "63",
    //                 amount: 1
    //             },
    //             {
    //                 idrow: "bhj",
    //                 id: 122,
    //                 name: "milk",
    //                 category: 2,
    //                 PurchasesHistoryId: "45",
    //                 PurchasePrognosisId: "63",
    //                 amount: 3
    //             }
    //         ]
    //     }, {
    //         orderName: "fifth",
    //         orderDate: new Date(),
    //         orderMail: "orabenesh@gmail.com",
    //         orderProducts: [
    //             {
    //                 idrow: "dgsa",
    //                 id: 123,
    //                 name: "bread",
    //                 category: 1,
    //                 PurchasesHistoryId: "45",
    //                 PurchasePrognosisId: "63",
    //                 amount: 1
    //             },
    //             {
    //                 idrow: "bhj",
    //                 id: 122,
    //                 name: "milk",
    //                 category: 2,
    //                 PurchasesHistoryId: "45",
    //                 PurchasePrognosisId: "63",
    //                 amount: 3
    //             }
    //         ]
    //     }, {
    //         orderName: "six",
    //         orderDate: new Date(),
    //         orderMail: "orabenesh@gmail.com",
    //         orderProducts: [
    //             {
    //                 idrow: "dgsa",
    //                 id: 123,
    //                 name: "bread",
    //                 category: 1,
    //                 PurchasesHistoryId: "45",
    //                 PurchasePrognosisId: "63",
    //                 amount: 1
    //             },
    //             {
    //                 idrow: "bhj",
    //                 id: 122,
    //                 name: "milk",
    //                 category: 2,
    //                 PurchasesHistoryId: "45",
    //                 PurchasePrognosisId: "63",
    //                 amount: 3
    //             }
    //         ]
    //     }, {
    //         orderName: "seven",
    //         orderDate: new Date(),
    //         orderMail: "orabenesh@gmail.com",
    //         orderProducts: [
    //             {
    //                 idrow: "dgsa",
    //                 id: 123,
    //                 name: "bread",
    //                 category: 1,
    //                 PurchasesHistoryId: "45",
    //                 PurchasePrognosisId: "63",
    //                 amount: 1
    //             },
    //             {
    //                 idrow: "bhj",
    //                 id: 122,
    //                 name: "milk",
    //                 category: 2,
    //                 PurchasesHistoryId: "45",
    //                 PurchasePrognosisId: "63",
    //                 amount: 3
    //             }
    //         ]
    //     }, {
    //         orderName: "eight",
    //         orderDate: new Date(),
    //         orderMail: "orabenesh@gmail.com",
    //         orderProducts: [
    //             {
    //                 idrow: "dgsa",
    //                 id: 123,
    //                 name: "bread",
    //                 category: 1,
    //                 PurchasesHistoryId: "45",
    //                 PurchasePrognosisId: "63",
    //                 amount: 1
    //             },
    //             {
    //                 idrow: "bhj",
    //                 id: 122,
    //                 name: "milk",
    //                 category: 2,
    //                 PurchasesHistoryId: "45",
    //                 PurchasePrognosisId: "63",
    //                 amount: 3
    //             }
    //         ]
    //     },
    // ];
    return (
        <>
            <div id="wrap">
                {arr == null ? <span> no purchases found ...</span> : arr.map((item: IpreviosPurchase) => (
                    <div className='basicCard'>
                        <BasicCard  {...item} />
                    </div>
                ))}
            </div>

            <Button className="previosToProducts" color="primary" startIcon={<ReplyRoundedIcon />} onClick={() => { navigate('/allCategory') }}>Products</Button>
            <Button className="previoustoPurchase" color="primary" startIcon={<ReplyRoundedIcon />} onClick={() => { navigate('/purchaseList') }}>Purchase List</Button>
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
    orderProducts: ProductByMount[]
}
export function BasicCard(props: IpreviosPurchase) {
    const navigate = useNavigate();
    return (
        // <Router>
        //     <Routes>
        //         <Route path="/basicCard" element={<BasicCard {...props}/>} />
        //         <Route path="/orderDetails" element={<OrderDetails {...props.productsList}/>} />
        <Card sx={{ maxWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {props.orderId}
                </Typography>
                <Typography variant="h5" component="div">
                    {/* {props.orderDate.getDay()*/}{/*bull*/}{/*props.orderDate.getMonth()*/}{/*bull*/}{/*props.orderDate.getFullYear()} */}
                    {props.orderDate.getDate()}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {props.orderDate.getHours()}{":" + props.orderDate.getMinutes()}
                </Typography>
                <Typography variant="body2">
                    {/* {props.orderDate.getDate()} */}
                    {props.orderDescription}
                    <br />
                </Typography>
            </CardContent>
            <CardActions>
                {/* <Button size="small" onClick={() => { navigate('./orderDetails', { state: { orderProducts: props.orderProducts } as INavigateProps }) }}>show order products</Button> */}
            </CardActions>
        </Card>
        //     </Routes>
        // </Router>
    );
}

export function OrderDetails() {
    const location = useLocation()
    const from = location.state as INavigateProps

    debugger
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ maxWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">product id</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {from.orderProducts.map((row: ProductByMount) => (
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
        </>
    )
}



