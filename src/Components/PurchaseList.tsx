// export function PurchaseList(props: any) {

//     // const [person, setPerson] = useState<User>();
//     // const [data, setData] = useState<ProductByMount[]>([]);
//     // useEffect(() => {
//     //     var peoplePromise = axios.get("https://localhost:44378/api/PurchasePrognosis").then((response) => {
//     //         setData(response.data);
//     //         console.log("hhhh")
//     //     });
//     // }, []);

//             {/* {props.myArr == null ? <span>wait...</span> : */}

//                         {props.myArr?.map((row: ProductByMount) => (
//                             <TableRow key={row.PurchasePrognosisId}   >
//                                 <TableCell align="center">{row.PurchasesHistoryId}</TableCell>
//                                 <TableCell align="center">{row.id}</TableCell>
//                                 <TableCell align="center"><TextField id="standard-number" type="number" value={row.amount} >   </TextField> </TableCell>

// }
// const mapStateToProps = (st: any) => {
//     //הפונקציה תחזיר אובייקט ובו כל השדות שאנו רוצים שייכנסו לפרופס של הקומםוננטה שלנו
//     //מתןך הסטייט הכללי
//     return {
//         myArr: st.pro.productsList,
//         // myArr:[]=[{d: 123,
//         //     name: "name",
//         //     category: 1,
//         //     PurchasesHistoryId: "123",
//         //     PurchasePrognosisId: "fgvhj",
//         //     amount: 3}]
//     };
// }
// export default connect(mapStateToProps)(PurchaseList);
import * as React from "react"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import {
    GridRowsProp,
    useGridApiRef,
    DataGridPro,
    GridApi,
    GridColumns,
    GridRowParams,
    MuiEvent,
    GridToolbarContainer,
    GridActionsCellItem,
    GridEventListener,
    GridEvents,
    GridRowId,
    GridRowModel,
} from '@mui/x-data-grid-pro';
import {
    randomCreatedDate,
    randomTraderName,
    randomUpdatedDate,
    randomId,
} from '@mui/x-data-grid-generator';
import { useNavigate } from "react-router-dom";
import { decreaseProductInList, increaseProductInList, removeProductFromList } from "../store/Actions/ProductInList";
// import { AllProducts } from "./AllProducts";
import { ProductByMount } from "../utils/modals";
import { connect, useDispatch, useSelector } from "react-redux";
import { productInListReducer } from "../store/Reducers/ProductInList";
import { IstatePro } from '../store/Reducers/ProductInList'
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import Logo from "./Logo";
// const rows: GridRowModel = [
//     {
//         id: randomId(),
//         name: randomTraderName(),
//         amount: 25,

//     },
//     {
//         id: randomId(),
//         name: randomTraderName(),
//         amount: 36,

//     },
//     {
//         id: randomId(),
//         name: randomTraderName(),
//         amount: 19,

//     },
//     {
//         id: randomId(),
//         name: randomTraderName(),
//         amount: 28,

//     },
//     {
//         id: randomId(),
//         name: randomTraderName(),
//         amount: 23,

//     },
// ];


interface EditToolbarProps {
    apiRef: React.MutableRefObject<GridApi>;
}
function EditToolbar(props: EditToolbarProps) {
    const { apiRef } = props;

    const handleClick = () => {
        const id = randomId();
        apiRef.current.updateRows([{ id, isNew: true }]);
        apiRef.current.startRowEditMode({ id });

        // Wait for the grid to render with the new row
        setTimeout(() => {
            apiRef.current.scrollToIndexes({
                rowIndex: apiRef.current.getRowsCount() - 1,
            });
            apiRef.current.setCellFocus(id, 'name');
        });
    };
    const navigate = useNavigate();
    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={() => { navigate('/allCategory'); }}>
                הוספת מוצרים
            </Button>
            <Button color="primary" startIcon={<ExitToAppRoundedIcon />} onClick={() => { navigate('/PreviousPurchases'); }}>
                קניות קודמות שלי
            </Button>
        </GridToolbarContainer>
    );
}
const mapStateToProps = (st: any) => {
    //הפונקציה תחזיר אובייקט ובו כל השדות שאנו רוצים שייכנסו לפרופס של הקומםוננטה שלנו
    //מתןך הסטייט הכללי
    debugger
    return {
        productList: st.pro.productsList
    };
}
export default connect(mapStateToProps)(function PurchaseList(props: any): JSX.Element {
    // const apiRef = useGridApiRef();
    const rows = props.productList
    // const rows = useSelector<IstatePro, ProductByMount[]>(state => state.productsList);

    const dispatch = useDispatch();

    const handleRowEditStart = (
        params: GridRowParams,
        event: MuiEvent<React.SyntheticEvent>,
    ) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop: GridEventListener<GridEvents.rowEditStop> = (
        params,
        event,
    ) => {
        event.defaultMuiPrevented = true;
    };


    //update state in every action
    const handleDeleteClick = (id: GridRowId) => (event: React.MouseEvent) => {
        event.stopPropagation();
        // apiRef.current.updateRows([{ id, _action: 'delete' }]);

    };
    const handleAddClick = (id: GridRowId) => (event: React.MouseEvent) => {
        debugger
        let p = rows.find((item: ProductByMount) => item.id == id) as ProductByMount
        // if(p)
        // == undefined ? {} as ProductByMount : rows.find((item: ProductByMount) => item.idrow == id)
        dispatch(increaseProductInList(p));

        // rows.map((row: GridRowModel) => {if(row.id === id) row.amount += 1 ;return row});

    };
    const handleReductionClick = (id: GridRowId) => (event: React.MouseEvent) => {
        let p = rows.find((item: ProductByMount) => item.id == id) as ProductByMount
        // if(p)
        // == undefined ? {} as ProductByMount : rows.find((item: ProductByMount) => item.idrow == id)
        dispatch(decreaseProductInList(p));


    };
    const handleCancelClick = (id: GridRowId) => async (event: React.MouseEvent) => {
        event.stopPropagation();
        // await apiRef.current.stopRowEditMode({ id, ignoreModifications: true });

        // const row = apiRef.current.getRow(id);
        // if (row!.isNew) {
        //     apiRef.current.updateRows([{ id, _action: 'delete' }]);
        // }
    };

    const processRowUpdate = async (newRow: GridRowModel) => {
        return { ...newRow, isNew: false };
    };

    const columns: GridColumns = [
        { field: 'name', headerName: 'שם', width: 180, editable: true },

        {
            field: 'add',
            type: 'actions',
            headerName: '+',
            width: 100,
            cellClassName: 'add',
            getActions: ({ id }) => {
                return [

                    <GridActionsCellItem
                        icon={<AddIcon />}
                        label="מחיקה"
                        onClick={handleAddClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
        { field: 'amount', headerName: 'כמות', type: 'number', editable: true },
        {
            field: 'reduction',
            type: 'actions',
            headerName: '-',
            width: 100,
            cellClassName: 'reduction',
            getActions: ({ id }) => {
                return [

                    <GridActionsCellItem
                        icon={<RemoveIcon />}
                        label="מחיקה"
                        onClick={handleReductionClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
        {
            field: 'Delete',
            type: 'actions',
            headerName: 'מחיקה',
            width: 100,
            cellClassName: 'Delete',
            getActions: ({ id }) => {
                return [

                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="מחיקה"
                        onClick={handleDeleteClick(id)}
                        //         () => {

                        //         //  removeProductFromList(id);
                        //     }
                        // }
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <>
            <Box
                sx={{
                    height: 500,
                    width: '100%',
                    '& .actions': {
                        color: 'text.secondary',
                    },
                    '& .textPrimary': {
                        color: 'text.primary',
                    },
                }}
            >
                <DataGridPro
                    rows={rows}
                    columns={columns}
                    // apiRef={apiRef}
                    editMode="row"
                    onRowEditStart={handleRowEditStart}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    components={{
                        Toolbar: EditToolbar,
                    }}
                    // componentsProps={{
                    //     toolbar: { apiRef },
                    // }}
                    experimentalFeatures={{ newEditingApi: true }}
                />
                <Button onClick={() => { }}>שמור</Button>
                {/* //update DB by state */}
            </Box>
            <Logo class_name={"logo-small"} />
        </>
    );

}) 
