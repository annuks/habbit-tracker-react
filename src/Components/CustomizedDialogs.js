//importing required resources
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import '../Styles/customeHabit.css'
//code for creating a custom dialog box using material ui


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
//props for accesing dynamic data set
export default function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(false);
  const [title,setTitle] = React.useState("");
  const [actions,setActions] = React.useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    props.setIsOpen(false);
  };


// using custom hooks for managing state
  React.useEffect(()=>{
    
    setOpen(props.open)
    setTitle(props.habit.title);
    setActions(props.habit.data.actions)
    console.log("CUs",props.habit.data.actions)
  },[props])

  return (
    <div className='dialog'>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {title}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <h3 className='desc'>Description</h3>
          <p className='descr'>{props.habit.desc}</p>
          <ul className='habit-action'>
          {Object.keys(actions).map((val,id)=>{
            return <li>{val}<span>{actions[val]}</span></li>
          })}
          </ul>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
