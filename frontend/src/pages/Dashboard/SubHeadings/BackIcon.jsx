import React from 'react';
import { ArrowBack } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  backButton: {
    color: 'white',  // Change this to the color you want
    backgroundColor: '#3f51b5',  // Change this to the background color you want
    padding: '10px',
    '&:hover': {
      backgroundColor: '#303f9f',  // Change this to the hover color you want
    },
  },
});

function BackIcon({ onClick }) {
    
  const classes = useStyles();

  return (
    <IconButton className={classes.backButton} onClick={onClick}>
      <ArrowBack />
    </IconButton>
  );
}

export default BackIcon
