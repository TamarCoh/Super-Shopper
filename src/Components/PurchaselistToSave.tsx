/* eslint-disable react/jsx-no-undef */
import * as React from "react";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import { ProductByMount } from "../utils/modals";
import {
  GridToolbarContainer,
  GridToolbarExport,
  DataGrid,
  GridColumns,
} from "@mui/x-data-grid";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";

export interface GridRowsProp {
  name: string;
  id: Number;
  amount: Number;
}
const columns: GridColumns = [
  {
    field: "name",
    headerName: "שם מוצר",
    type: "string",
    width: 200,
  },

  {
    field: "amount",
    headerName: "כמות",
    type: "Number",

    width: 150,
  },
  {
    field: "id",
    headerName: "קוד מוצר",
    type: "Number",
    width: 150,
  },
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport
        csvOptions={{
          fileName: "customerDataBase",
          delimiter: ";",
          utf8WithBom: true,
        }}
      />
    </GridToolbarContainer>
  );
}
interface IforLocation {
  p: ProductByMount[];
  pd: Date;
  hd: string;
}

export default function PurchaselistToSave() {
  debugger;
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state as IforLocation;
  let rows: GridRowsProp[] = from.p.map((item: ProductByMount) => {
    let row: GridRowsProp;
    row = {
      name: item.name,
      id: item.id,
      amount: item.amount,
    };
    return row as GridRowsProp;
  });
  const [currentHebrewDateTime, setCurrentHebrewDateTime] = useState<string>("");
  React.useEffect(() => {
    async function f() {
      await axios
        .get("https://localhost:44378/api/GetCurrentJewishHebrewDate")
        .then((res) => {
          let d = res.data;
          debugger;
          setCurrentHebrewDateTime(d);
        })
        .catch(() => {
          debugger;
          setCurrentHebrewDateTime("_____");
        });
    }
    f();
  });
  return (
    <>
      <div>
        {"קנייה בתאריך: "}
        <nav>
          {from.hd==null?currentHebrewDateTime:from.hd}
          {" , " + from.pd + " "}
        </nav>
      </div>
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </div>
      <Button
        className="detailsToPreviouses"
        color="primary"
        startIcon={<ReplyRoundedIcon />}
        onClick={() => {
          navigate("/previousPurchases");
        }}
      >
        חזרה
      </Button>
    </>
  );
}
