import * as React from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import "./Enter.css";
import Logo from "./Logo";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {!open && (
        <div>
          <Button id="lin" onClick={handleOpen}>
            להרשמה
          </Button>
          <>?משתמש חדש </>
        </div>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        // aria-labelledby="child-modal-title"
        // aria-describedby="child-modal-description"
      >
        <>
          <SignUp />
          <Button className="left" id="lin" onClick={handleClose}>
            להתחברות
          </Button>
          <>?רשום כבר </>
        </>
      </Modal>
    </>
  );
}
interface Iboolean {
  isOpen: boolean;
  closeLogin: boolean;
}
export function Enter() {
  const location = useLocation();
  const from = location.state as Iboolean;
  const [open, setOpen] = React.useState<boolean>(from.isOpen);
  const navigate = useNavigate();
  const user = useSelector((st: any) => st.Use.state);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    {user && setOpen(false)}
  });
  return (
    <div>
      <Logo class_name={"logo"} />
      {!user && (
        <Button id="eneter" onClick={handleOpen}>
          כניסה
        </Button>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div>
          <LogIn />
          <ChildModal />
          <div>
            <Button onClick={handleClose} id="x">
              X
            </Button>
          </div>
        </div>
      </Modal>
      {user && (
        <Stack direction="row">
          <div id="left" onClick={() => navigate("./PreviousPurchases")}>
            <IconButton>
              <ArrowBackTwoToneIcon />
              קניות קודמות שלי{" "}
            </IconButton>
          </div>
          <div id="right" onClick={() => navigate("./purchaseList")}>
            <IconButton>
              הכן לי רשימת קניות <ArrowForwardIcon />
            </IconButton>
          </div>
        </Stack>
      )}
    </div>
  );
}
export default Enter;
