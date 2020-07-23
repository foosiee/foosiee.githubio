import React from 'react';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { TextareaAutosize, Grid, Button } from '@material-ui/core';
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
    wide: {
      width: '100%'
    }
  }),
);

export default function EmailForm() {
  const classes = useStyles();

  return (
    <div>
        <Grid item xs={12}>
        <h4><ColoredText color="#50fa7b">Contact Me</ColoredText></h4>
      </Grid>
      <form name="contact" className={classes.root} noValidate autoComplete="off" data-netlify={true} data-netlify-honeypot="bot-field">
        <Grid item xs={12}>
          <CssTextField fullWidth={true} id="standard-basic" label="Email"  type="email" name="email" />
        </Grid>
        <Grid item xs={12}>
          <CssTextField fullWidth={true} id="standard-basic" label="Name" type="name" name="name" />
        </Grid>
        <Grid item xs={12}>
          <CssTextField fullWidth={true} id="standard-basic" label="Company" name="company" />
        </Grid>
        <Grid item xs={12}>
          <TextareaAutosize className={classes.wide} aria-label="minimum height" rowsMin={10}  placeholder="Any further details"  name="details" />          
        </Grid>
        <Grid item xs={12}>
          <StyledButton>Submit</StyledButton>
        </Grid>
      </form>
    </div>
    
  );
}
