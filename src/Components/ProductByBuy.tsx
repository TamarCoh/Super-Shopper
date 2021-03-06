import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import IconButton from "@mui/material/IconButton";
import { ProductByMount, ProductByCategory } from "../utils/modals";
import "./CommonColor.css";
import "./AllProducts.css";
import { useDispatch } from "react-redux";
import { increaseProductInList } from "../store/Actions/ProductInList";
import { randomId } from "@mui/x-data-grid-generator";

function AddProductBuy(
  product: ProductByCategory,
  amount: number,
  dispatch: any
) {
  let productByBuy: ProductByMount = {} as ProductByMount;
  productByBuy.idrow = randomId();
  productByBuy.name = product.name;
  productByBuy.id = product.id;
  productByBuy.amount = amount;
  dispatch(increaseProductInList(productByBuy));
}
interface BadgeVisibilityModal {
  product: ProductByCategory;
}

export const BadgeVisibility: React.FunctionComponent<BadgeVisibilityModal> = ({
  product,
}: BadgeVisibilityModal) => {
  const [count, setCount] = React.useState(0);
  // const [invisible, setInvisible] = React.useState(false);
  const dispatch = useDispatch();
  // const handleBadgeVisibility = () => {
  //   setInvisible(!invisible);
  // };
  return (
    <Box
      className="allCard"
      sx={{
        color: "action.active",
        display: "flex",
        flexDirection: "column",
        "& > *": {
          marginBottom: 2,
        },
        "& .MuiBadge-root": {
          marginRight: 4,
        },
      }}
    >
      <div>
        <ButtonGroup>
          <Badge color="primary" badgeContent={count}>
            <IconButton
              sx={{ color: "#4c6a92" }}
              aria-label="add to shopping cart"
              size="small"
              onClick={() => {
                AddProductBuy(product, count, dispatch);
                setCount(0);
              }}
            >
              <AddShoppingCartIcon />
              <p>add</p>
            </IconButton>
          </Badge>
          <Button
            aria-label="reduce"
            onClick={() => {
              setCount(Math.max(count - 1, 0));
            }}
          >
            <RemoveIcon fontSize="small" />
          </Button>

          <Button
            aria-label="increase"
            onClick={() => {
              setCount(count + 1);
            }}
          >
            <AddIcon fontSize="small" />
          </Button>
        </ButtonGroup>
      </div>
    </Box>
  );
};

export default function Product(props: any) {
  return (
    <Card sx={{ width: 230, height: 350, margin: 4 }}>
      <CardMedia
        sx={{
          minWidth: 50,
          maxWidth: 140,
          minHeight: 100,
          maxHeight: 130,
          marginRight: 0,
          marginLeft: 4.5,
          padding: 0,
        }}
        component="img"
        height="140"
        src={`./${props.product.img?.default}`}
        alt=""
      />
      <CardContent>
        <Typography
          gutterBottom
          component="div"
          sx={{ fontSize: 21, padding: 0 }}
        >
          {props.product.name}
        </Typography>
        <Typography
          gutterBottom
          component="div"
          sx={{ fontSize: 10, padding: 0 }}
        >
          {props.product.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ margin: 1 }}>
        <BadgeVisibility product={props.product} />
      </CardActions>
    </Card>
  );
}
