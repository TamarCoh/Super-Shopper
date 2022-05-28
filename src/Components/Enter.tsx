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
import { animated, useSpring } from 'react-spring';
import { useNavigate } from 'react-router-dom';
interface IMyProps {
    open: boolean,
}
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
                    <Button id="lin" onClick={handleOpen}>רישום</Button>
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
                        <Button id="lin" onClick={handleClose} >התחברות</Button>
                        <>?רשום כבר   </>

                    </>

                </Modal>
            </>
        </React.Fragment>
    );
}

export function Enter(props: IMyProps) {
    const [open, setOpen] = React.useState(props.open);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const navigate = useNavigate();
    return (
        <div>
            <Logo class_name={"logo"} />
            <Button id='eneter' onClick={handleOpen}>כניסה</Button>
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
                <div id="left" onClick={() => navigate('./PreviousPurchases')}><IconButton ><ArrowBackTwoToneIcon />קניות קודמות שלי </IconButton></div>
                <div id="right" onClick={() => navigate('./purchaseList')}><IconButton >הכן לי רשימת קניות <ArrowForwardIcon /></IconButton></div>
            </Stack >

        </div >
    );
}
// function BackwardsCompatability() {
//     const [styles, api] = useSpring(() => ({
//       from: { x: -50, opacity: 1 },
//     }))

//     React.useEffect(() => {
//       api({
//         x: 50,
//         opacity: 1,
//         loop: { reverse: true },
//       })
//     }, [])

//     return (
//       <animated.div
//         style={{
//           width: 80,
//           height: 80,
//           backgroundColor: '#46e891',
//           borderRadius: 16,
//           ...styles,
//         }}
//       />
//     )
//   }
export default Enter;