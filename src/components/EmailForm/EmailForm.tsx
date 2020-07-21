import React from 'react';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { TextareaAutosize, Grid } from '@material-ui/core';
import StyledButton from '../StyledButton/StyledButton';
import ColoredText from '../ColoredText/ColoredText';

const CssTextField = withStyles({
  root: {
    '& input': {
      color: '#f8f8f2'
    },
    '& label': {
      color: '#ff79c6'
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: '#ff79c6'
    },
    '& label.Mui-focused': {
      color: '#ff79c6',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#ff79c6',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ff79c6',
        color: 'white'
      },
      '&:hover fieldset': {
        borderColor: 'ff79c6',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#bd93f9',
      },
    },
  },
})(TextField);


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    text: {
      color: '#f8f8f2',
    },
  }),
);

export default function EmailForm() {
  const classes = useStyles();

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <h4><ColoredText color="#50fa7b">Contact Me</ColoredText></h4>
      </Grid>
      <form className={classes.root} noValidate autoComplete="off" data-netlify={true}>
        <Grid item xs={12}>
          <CssTextField id="standard-basic" label="Email" />
        </Grid>
        <Grid item xs={12}>
          <CssTextField id="standard-basic" label="Name" />
        </Grid>
        <Grid item xs={12}>
          <CssTextField id="standard-basic" label="Company" />
        </Grid>
        <Grid item xs={12}>
          <TextareaAutosize aria-label="minimum height" rowsMin={3} placeholder="Any further details" />          
        </Grid>
        <Grid item xs={12}>
          <StyledButton>Submit</StyledButton>
        </Grid>
      </form>
    </Grid>
  );
}
