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
// import { Category } from "@mui/icons-material";

async function getCategoies() {
  let categoriesList:Category[] = [];
  try {
    const res = await axios.get("https://localhost:44378/api/Category");
    categoriesList = res.data.toList();
  } catch {
    categoriesList = [];
  }
  return categoriesList;
}

async function getProducts(category: Category) {
  let productList: ProductByCategory[] = [];
  try {
    const res = await axios.get(
      `https://localhost:44378/api/Products?category=${category.id}`
    );
    productList = res.data as ProductByCategory[];
  } catch {
    productList = [];
  }
  return productList ;
}



 export default async function CategoriesNavigation() {
  const [category, setCategory] = React.useState<Category>({id: 1,title:"blabla"});
  const ref = React.useRef<HTMLDivElement>(null);
  const [productList, setProductList] = React.useState<ProductByCategory[]>();

   React.useEffect(async () => {
    (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
    const tempProducts=await getProducts(category)
    setProductList(tempProducts);
  }, [category, productList]);
  const categoryList = await getCategoies() ;
 
   
  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
     
      <Paper sx={{ position: "fixed", top: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={category}
          onChange={(event, newValue) => {
            setCategory(newValue);

          }}
        >{
          categoryList.map((category:Category)=>(<BottomNavigationAction label={category.title} icon={<RestoreIcon />} />))
        }
          
        </BottomNavigation>
      </Paper> 
      <AllProducts productList={productList} catgory={category}></AllProducts>
    </Box>
  );
}
