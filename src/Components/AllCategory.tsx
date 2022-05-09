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
import AllProducts from "./AllProducts";
import { Product } from "./Product";
import { JsxElement } from "typescript";
// import { Category } from "@mui/icons-material";
const mockupCategoriesList: Category[] = [
  { id: 1, title: "category1" },
  { id: 2, title: "category2" },
  { id: 3, title: "category3" },
  { id: 4, title: "category4" },
];

const mockupProductList: ProductByCategory[] = [
  { id: "1", name: "category1", categoryId: 1 },
  { id: "2", name: "category2", categoryId: 2 },
  { id: "3", name: "category3", categoryId: 3 },
  { id: "123", name: "category4", categoryId: 4 },
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

function getProducts(category: Category) {
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
  return [mockupProductList[category.id - 1]];
}

export default function CategoriesNavigation() {
  const [category, setCategory] = React.useState<Category>({
    id: 1,
    title: "category1",
  });
  const ref = React.useRef<HTMLDivElement>(null);
  const [productList, setProductList] = React.useState<ProductByCategory[]>();

  React.useEffect(() => {
    (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
    function anyNameFunction() {
      const tempProducts = getProducts(category);
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
