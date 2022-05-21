import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import { Category, ProductByCategory } from "../utils/modals";
import { JsxElement } from "typescript";
import { Container } from "@material-ui/core";
import AllProducts from "../Components/AllProducts";
import './AllCategory.css';
import { Button } from "@mui/material";
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import { useNavigate } from "react-router-dom";
// import AllProducts from "./AllProducts";



// import { Category } from "@mui/icons-material";
// const mockupCategoriesList: Category[] = [
//   { id: 1, title: "Sales" },
//   { id: 2, title: "Drinks" },
//   { id: 3, title: "Milk" },
//   { id: 4, title: "Meat" },
// ];

// const mockupProductList: ProductByCategory[] = [
//   { id: 11, name: "product1", category: 1 },
//   { id: 22, name: "product2", category: 2 },
//   { id: 33, name: "product3", category: 3 },
//   { id: 44, name: "product4", category: 4 },
// ];

async function getCategories() {
  let categoriesList: Category[] = [];
  try {
    const res = await axios.get("https://localhost:44378/api/Category");
    // debugger
    categoriesList = res.data
  } catch (err) {
    categoriesList = [];
    console.log("categories catch: " + err);
  }
  return categoriesList;
  // return mockupCategoriesList;
}

async function getProductsByCategory(category: Category) {
  let productList: ProductByCategory[] = [];
  try {
    const res = await axios.get(
      `https://localhost:44378/api/Products?category=${category}`
    );
    productList = res.data as ProductByCategory[];
  } catch (err) {
    productList = [];
    console.log("catchhhhhhh: " + err);
  }
  return productList;
  // return [mockupProductList[category.id - 1]]; 
  // return mockupProductList;
}

export default function CategoriesNavigation() {
  const [category, setCategory] = React.useState<Category>({ id: 1, title: "Sales" });
  const ref = React.useRef<HTMLDivElement>(null);
  const [productList, setProductList] = React.useState<ProductByCategory[]>();
  const [categoryList, setCategoryList] = React.useState<Category[]>([]);

  React.useEffect(() => {
    (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;

    async function anyNameFunction2() {
      const tempCategoryList = await getCategories();
      setCategoryList(tempCategoryList);
    }
    anyNameFunction2();

  }, []);
  React.useEffect(() => {
    async function anyNameFunction() {
      const tempProducts = await getProductsByCategory(category);
      setProductList(tempProducts);
    }
    anyNameFunction();
  }, [category]);
  const navigate = useNavigate();
  return (

    <Box sx={{ pb: 1000 }} ref={ref}>
      <CssBaseline />
      <Paper id="box_paper" sx={{ position: "sticky", top: 0, right: 0 }} elevation={1}>
        <BottomNavigation
          showLabels
          value={category}
          onChange={(event, newValue) => {
            setCategory(newValue);
          }}
        >
          {categoryList == null ? <span> no categories</span> : categoryList.map((category: Category) =>
          (
            <>
              < BottomNavigationAction
                value={category}
                label={category.title}
              //  icon={<RestoreIcon />}
              />
              category.title
            </>
          ))}
        </BottomNavigation>
      </Paper>
      <AllProducts productList={productList} catgory={category}></AllProducts>
      <Button className="categoriesToPrevios" color="primary" startIcon={<ReplyRoundedIcon />} onClick={() => { navigate('/previousPurchases') }}>Previos Purchases</Button>
      <Button className="categoriestoPurchase" color="primary" startIcon={<ReplyRoundedIcon />} onClick={() => { navigate('/purchaseList') }}>Purchase List</Button>
    </Box>
  );
}
