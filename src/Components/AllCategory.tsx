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
import { AllProducts } from "./AllProducts";
// import { Category } from "@mui/icons-material";
const mockupCategoriesList: Category[] = [
  { id: 1, title: "Sales" },
  { id: 2, title: "Drinks" },
  { id: 3, title: "Milk" },
  { id: 4, title: "Meat" },
];

const mockupProductList: ProductByCategory[] = [
  { id: 11, name: "product1", category: 1 },
  { id: 22, name: "product2", category: 2 },
  { id: 33, name: "product3", category: 3 },
  { id: 44, name: "product4", category: 4 },
];

function getCategoies() {
  let categoriesList: Category[] = [];
  // try {
  //   const res = await axios.get("https://localhost:44378/api/Category");
  //   categoriesList = res.data.toList();
  // } catch {
  //   categoriesList = [];
  // }
  // return categoriesList;
  return mockupCategoriesList;
}

function getProductsByCategory(category: Category) {
  // let productList: ProductByCategory[] = [];
  // try {
  //   const res = await axios.get(
  //     `https://localhost:44378/api/Products?category=${category}`
  //   );
  //   productList = res.data as ProductByCategory[];
  // } catch {
  //   productList = [];
  // }
  // return productList;
  // return [mockupProductList[category.id - 1]];
  return mockupProductList;
}

export default function CategoriesNavigation() {
  const [category, setCategory] = React.useState<Category>({
    id: 1,
    title: "Sales",
  });
  const ref = React.useRef<HTMLDivElement>(null);
  const [productList, setProductList] = React.useState<ProductByCategory[]>();

  React.useEffect(() => {
    (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
    function anyNameFunction() {
      const tempProducts = getProductsByCategory(category);
      setProductList(tempProducts);
    }
    anyNameFunction();
  }, [category]);
  const categoryList = getCategoies();

  return (
    <Box sx={{ pb: 1000 }} ref={ref}>
      <CssBaseline />

      <Paper sx={{ position: "relative", top: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={category}
          onChange={(event, newValue) => {
            setCategory(newValue);
          }}
        >
          {categoryList.map((category: Category) => (
            <BottomNavigationAction
              value={category}
              label={category.title}
              icon={<RestoreIcon />}
            />
          ))}
        </BottomNavigation>
      </Paper>
      <AllProducts productList={productList} catgory={category}></AllProducts>
    </Box>
  );
}
