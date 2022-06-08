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
import Logo from "./Logo";
import './Logo.css'
// import AllProducts from "./AllProducts";
import { ProductByMount } from "../utils/modals";
import { connect, useDispatch, useSelector } from "react-redux";
import { productInListReducer } from "../store/Reducers/ProductInList";
import { IstatePro } from '../store/Reducers/ProductInList'
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index: number) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

async function getCategories() {
  let categoriesList: Category[] = [];
  try {
    const res = await axios.get("https://localhost:44378/api/Category");
    // 
    categoriesList = res.data.map((item: any) => {
      let category: Category
      category = {
        id: item.ProductCategoryId,
        title: item.Name
      }
      return category as Category
    })
  } catch (err) {
    categoriesList = [];
    console.log("categories catch: " + err);
  }
  return categoriesList;
  // return mockupCategoriesList;
}
interface keyValue {
  key: string,
  value: string
}
type tplotOptions = {
  [key: string]: string
}
function importAll(r: any) {
  let images: tplotOptions = {};
  r.keys().map((item: any, index: any) => { images[item.replace('./', '')] = r(item); });
  console.log('images', images)
  return images;
}

const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));

async function getProductsByCategory(category: Category) {
  let productList: ProductByCategory[] = [];
  try {
    const res = await axios.get(
      `https://localhost:44378/api/GetProductsByCategoryId/${category.id}`);


    // productList 
    //= res.data as ProductByCategory[]
    let arrImg: keyValue[] = []
    productList = res.data.map((p: any) => {
      let product: ProductByCategory
      // arrImg.push({key:p.Image,value:}as keyValue)
      product = {
        name: p.Name,
        id: p.ProductId,
        category: p.ProductCategoryId,
        img: images[p.Image]||images['logo.png']
        // img:images[p.Image]

      }
      console.log(product.img)
      return product as ProductByCategory
    });
  }
  catch (err) {
    productList = [];
    console.log("catchhhhhhh: " + err);
  }
  return productList;
  // return [mockupProductList[category.id - 1]]; 
  // return mockupProductList;
}

export default function CategoriesNavigation() {
  const [category, setCategory] = React.useState<Category>({ id: 1, title: "drinks" });
  const ref = React.useRef<HTMLDivElement>(null);
  const [productList, setProductList] = React.useState<ProductByCategory[]>([]);
  const [categoryList, setCategoryList] = React.useState<Category[]>([]);

  React.useEffect(() => {
    // (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;

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

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [i, setI] = React.useState<number>(0);

  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  };

  return (

    // <Box sx={{ pb: 1000 }} ref={ref}>
    //   <CssBaseline />
    //   <Paper id="box_paper" sx={{ position: "sticky", top: 0, right: 0 }} >
    //     <BottomNavigation
    //       showLabels
    //       value={category.title}
    //       onChange={(event, newValue) => {
    //         
    //         setCategory(newValue);
    //       }}
    //     >
    //       {categoryList == null ? <span> רשימת הקטגוריות ריקה</span> : categoryList.map((category: Category) =>
    //       (
    //         <>
    //           < BottomNavigationAction
    //             className="bottomNavigationAction"
    //             value={category}
    //             label={category.title}
    //             // icon={<RestoreIcon></RestoreIcon >}
    //             onClick={() => {
    //               setCategory(category);
    //             }}

    //           />
    //           {/* {category.title} */}
    //           {/* //why is the category.title undefined????????? */}
    //         </>
    //       ))}
    //     </BottomNavigation>
    //   </Paper>
    <>
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={category.title}
            onChange={(event, newValue) => {

              setCategory(newValue);
            }}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            aria-label="scrollable force tabs example"
          >
            {categoryList == null ? <span> רשימת הקטגוריות ריקה</span> : categoryList.map((category: Category) =>
            (
              <>
                < Tab
                  className="bottomNavigationAction"
                  value={category}
                  label={category.title}
                  onClick={() => {
                    setCategory(category);
                  }}
                  {...a11yProps(i)}
                />
                {() => { setI(i + 1) }}
              </>
            ))}
            {/* <Tab label="Item One" icon={<PhoneIcon />} {...a11yProps(0)} />
            <Tab label="Item Two" icon={<FavoriteIcon />} {...a11yProps(1)} />
            <Tab label="Item Three" icon={<PersonPinIcon />} {...a11yProps(2)} />
            <Tab label="Item Four" icon={<HelpIcon />} {...a11yProps(3)} />
            <Tab label="Item Five" icon={<ShoppingBasket />} {...a11yProps(4)} />
            <Tab label="Item Six" icon={<ThumbDown />} {...a11yProps(5)} />
            <Tab label="Item Seven" icon={<ThumbUp />} {...a11yProps(6)} /> */}
          </Tabs>
        </AppBar>
        {/* <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
        <TabPanel value={value} index={6}>
          Item Seven
        </TabPanel> */}
      </div>
      <AllProducts productList={productList} catgory={category}></AllProducts>
      <Button className="categoriesToPrevios" color="primary" startIcon={<ReplyRoundedIcon />} onClick={() => { navigate('/previousPurchases') }}>קניות קודמות שלי</Button>
      <Button className="categoriestoPurchase" color="primary" startIcon={<ReplyRoundedIcon />} onClick={() => { navigate('/purchaseList') }}>רשימת קניות</Button>
      <Logo class_name={"logo-small"} />
    </>
    // </Box>
  );
}
