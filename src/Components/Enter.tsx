import * as React from 'react';
import Box from '@mui/material/Box';
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

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

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
                    <>Don't have an account?</>
                    <Button id="lin" onClick={handleOpen}>sign up</Button></div>}
                <Modal
                    hideBackdrop
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <>
                        <SignUp />
                        <>A registered user?</>
                        <Button onClick={handleClose} id="lin">log in</Button>

                    </>

                </Modal>
            </>
        </React.Fragment>
    );
}

export function Enter() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Logo />
            <Button onClick={handleOpen}>Enter</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <div>

                    <LogIn />
                    <ChildModal />
                </div>

            </Modal>

            <Stack direction="row" >
                <IconButton ><ArrowBackTwoToneIcon />My Previous Purchases </IconButton>
                <IconButton >Make me a purchase <ArrowForwardIcon /></IconButton>
            </Stack >

        </div >
    );
}
export default Enter;