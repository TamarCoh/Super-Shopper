import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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

interface IpreviosPurchase {
    orderName: string;
    orderDate: Date;
    orderMail: String;
    orderProducts: ProductByMount[];

}
export default function PreviosPurchases() {
    const navigate = useNavigate();
    const ref = React.useRef<HTMLDivElement>(null);

    const arr: IpreviosPurchase[] = [
        {
            orderName: "first",
            orderDate: new Date(),
            orderMail: "orabenesh@gmail.com",
            orderProducts: [
                {
                    idrow: "dgsa",
                    id: 123,
                    name: "bread",
                    category: 1,
                    PurchasesHistoryId: "45",
                    PurchasePrognosisId: "63",
                    amount: 1
                },
                {
                    idrow: "bhj",
                    id: 122,
                    name: "milk",
                    category: 2,
                    PurchasesHistoryId: "45",
                    PurchasePrognosisId: "63",
                    amount: 3
                }
            ]
        }
    ];
    return (
        <>
            <div id="wrap">
                {arr.map((item: IpreviosPurchase) => <BasicCard {...item} />)}
                <Button className="previosToProducts" color="primary" startIcon={<ReplyRoundedIcon />} onClick={() => { navigate('/allCategory') }}>Products</Button>
                <Button className="previoustoPurchase" color="primary" startIcon={<ReplyRoundedIcon />} onClick={() => { navigate('/purchaseList') }}>Purchase List</Button>
            </div>
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

export function BasicCard(props: IpreviosPurchase) {
    return (
        <Card sx={{ maxWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {props.orderName}
                </Typography>
                <Typography variant="h5" component="div">
                    {props.orderDate.getDay()}{bull}{props.orderDate.getMonth()}{bull}{props.orderDate.getFullYear()}
                    {/* {props.orderDate.toDateString()} */}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {props.orderDate.getHours()}{":" + props.orderDate.getMinutes()}
                </Typography>
                <Typography variant="body2">
                    {/* {props.orderDate.getDate()} */}
                    {props.orderMail}
                    <br />
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => { <OrderDetails {...props.orderProducts} /> }}>show order products</Button>
            </CardActions>
        </Card>
    );
}

export function OrderDetails(props: ProductByMount[]) {

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ maxWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nmae</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">product id</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.map((row: ProductByMount) => (
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



