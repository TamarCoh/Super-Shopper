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
import { ProductByMount, ActuallyPurchase } from "../utils/modals";
import { connect, useDispatch, useSelector } from "react-redux";
import { productInListReducer } from "../store/Reducers/ProductInList";
import { IstatePro } from '../store/Reducers/ProductInList'
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import Logo from "./Logo";
import { DataGrid } from "@mui/x-data-grid";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import { PropaneSharp } from "@mui/icons-material";
import axios from "axios";

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
    console.log(st.pro.productsList)
    return {
        productList: st.pro.productsList,
        user: st.Use.state
    };
}
export default function PurchaseList(): JSX.Element {
    // const apiRef = useGridApiRef();
    debugger
    const productList = useSelector((st: any) => st.pro.productsList)
    const productState = useSelector((st: any) => st.pro)

    const user = useSelector((st: any) => st.Use.state)


    let rows: ProductByMount[] = [];
    //useEffect?->
    rows = productList.filter((i: ProductByMount) => i.amount > 0)
    React.useEffect(() => {
        debugger
        localStorage.setItem('productList', JSON.stringify(productState))

    }, [productList])

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
        debugger
        event.stopPropagation();
        let p: ProductByMount = rows.find((item: ProductByMount) => item.id == id) as ProductByMount

        dispatch(removeProductFromList(p));

        // apiRef.current.updateRows([{ id, _action: 'delete' }]);

    };
    const handleAddClick = (id: GridRowId) => (event: React.MouseEvent) => {
        debugger
        let p: ProductByMount = rows.find((item: ProductByMount) => item.id == id) as ProductByMount
        const temp = {
            idrow: p.idrow,
            id: p.id,
            name: p.name,
            PurchasesHistoryId: p.PurchasesHistoryId,
            PurchasePrognosisId: p.PurchasePrognosisId,
            amount: 1
        } as ProductByMount;
        dispatch(increaseProductInList(temp));


    };
    const handleReductionClick = (id: GridRowId) => (event: React.MouseEvent) => {
        debugger
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
            headerName: 'הוספה',
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
            headerName: 'הפחתה',
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
const navigate=useNavigate();
    return (
        <>
            {(user == null || user == undefined) ? <span>ספר לנו מי אתה ונכין לך רשימת קניות</span> :
                <>
                    <h3>:הצעת הקניות שלנו עבורך היא</h3>
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
                        {rows.length < 2 && <span>הנך חדש במערכת, בצע קניות והמערכת תלמד את הרגליך לעתיד</span>}
                        <DataGrid
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


                    </Box>
                    <Button
                        // {/* //update DB by state */}
                        onClick={async () => {
                            debugger
                            let l: ActuallyPurchase[]
                            l = productList.map((item: ProductByMount) => {
                                let product: ActuallyPurchase = {
                                    PurchasesHistoryId: parseInt(item.PurchasesHistoryId),
                                    ProductId: item.id,
                                    Name: item.name,
                                    Amount: item.amount,
                                    PurchasePrognosisId: parseInt(item.PurchasePrognosisId),
                                } as ActuallyPurchase
                                return product
                            })
                            await axios.post(`https://localhost:44378/api/AddActPur/${user.id}`, l).then(res =>{
                                    console.log(res)
                                    navigate('./purchaselistToSave')}).catch(err => console.log(err))
                        }}>שמור</Button>
                    <Logo class_name={"logo-small"} />
                    <h4>!משתמש יקר  </h4>
                    <h5>באם הצעת הקניות שלנו לא מספיק טובה עבורך בשל ארוע קרב/ זמן מיוחד באפשרותך לשנות כמויות ו/או מוצרים והמערכת תלמד את שינוייך לפעמים הבאות </h5>

                </>
            }
        </>
    );

}
