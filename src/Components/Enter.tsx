import * as React from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import LogIn from './LogIn';
import SignUp from './SignUp';
import './Enter.css';
import Logo from './Logo';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import {  useLocation, useNavigate } from 'react-router-dom';
import {  useSelector } from 'react-redux';


function ChildModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <React.Fragment>
            <>
                {!open && <div>
                    <Button id="lin" onClick={handleOpen} >רישום</Button>
                    <>?משתמש חדש    </>
                </div>
                }
                <Modal
                    hideBackdrop
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <>
                        <SignUp />
                        <Button className='left' id="lin" onClick={handleClose} >התחברות</Button>
                        <>?רשום כבר   </>
                    </>
                </Modal>
            </>
        </React.Fragment>
    );
}

export function Enter() {
    const location = useLocation()
    const from = location.state as boolean
    const [openM, setOpenM] = React.useState<boolean>(from);
    const navigate = useNavigate();
    const user = useSelector((st: any) => st.Use.state)

    const handleOpen = () => {
        setOpenM(true);
    };
    const handleClose = () => {
        setOpenM(false);
    };
    return (
        <div>
            <Logo class_name={"logo"} />
            {!user &&
            <Button id='eneter' onClick={handleOpen}>כניסה</Button>
            }
            <Modal
                open={openM}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <div>
                    <LogIn />
                    <ChildModal />
                </div>

            </Modal>
            {user &&
                <Stack direction="row" >
                    <div id="left" onClick={() => navigate('./PreviousPurchases')}><IconButton ><ArrowBackTwoToneIcon />קניות קודמות שלי </IconButton></div>
                    <div id="right" onClick={() => navigate('./purchaseList')}><IconButton >הכן לי רשימת קניות <ArrowForwardIcon /></IconButton></div>
                </Stack >
            }
        </div >
    );
}
export default Enter;
