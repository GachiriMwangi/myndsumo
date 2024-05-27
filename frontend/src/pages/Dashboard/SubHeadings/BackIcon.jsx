import React from 'react';
import { ArrowBack } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  backButton: {
    color: 'white', 
    backgroundColor: '#3f51b5',  
    padding: '10px',
    '&:hover': {
      backgroundColor: '#303f9f', 
    },
  },
});

function BackIcon({ onClick }) {
    
  const classes = useStyles();

  return (
    <>
        <IconButton className={classes.backButton} onClick={onClick}>
      <ArrowBack />
    </IconButton>
    &nbsp;&nbsp;
    Go Back
    </>

  );
}

export default BackIcon
