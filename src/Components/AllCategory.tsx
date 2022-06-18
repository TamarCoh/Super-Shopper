import * as React from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import { Category, ProductByCategory } from "../utils/modals";
import AllProducts from "../Components/AllProducts";
import './AllCategory.css';
import { Button } from "@mui/material";
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import './Logo.css'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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
}
type tplotOptions = {
  [key: string]: string
}
function importAll(r: any) {
  let images: tplotOptions = {};
  r.keys().map((item: any, index: any) => { images[item.replace('./', '')] = r(item); return true;});
  console.log('images', images)
  return images;
}

const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));

async function getProductsByCategory(category: Category) {
  let productList: ProductByCategory[] = [];
  try {
    const res = await axios.get(
      `https://localhost:44378/api/GetProductsByCategoryId/${category.id}`);
    productList = res.data.map((p: any) => {
      let product: ProductByCategory
      product = {
        name: p.Name,
        id: p.ProductId,
        category: p.ProductCategoryId,
        img: images[p.Image]||images['logo.png'],
        description:p.Description
      }
      console.log(product.img)
      return product as ProductByCategory
    });
  }
  catch (err) {
    productList = [];
    console.log("getProductsByCategory: " + err);
  }
  return productList;
}

export default function CategoriesNavigation() {
  const [category, setCategory] = React.useState<Category>({ id: 1, title: "drinks" });
  // const ref = React.useRef<HTMLDivElement>(null);
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
  const [i, setI] = React.useState<number>(0);
  return (
    <>
      <div className={classes.root} id="categoriesNav">
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
          </Tabs>
        </AppBar>
      </div>
      <AllProducts productList={productList} catgory={category}></AllProducts>
      <Button className="categoriesToPrevios" color="primary" startIcon={<ReplyRoundedIcon />} onClick={() => { navigate('/previousPurchases') }}>קניות קודמות שלי</Button>
      <Button className="categoriestoPurchase" color="primary" startIcon={<ReplyRoundedIcon />} onClick={() => { navigate('/purchaseList') }}>רשימת קניות</Button>
      <Logo class_name={"logo-small"} />
    </>
  );
}
