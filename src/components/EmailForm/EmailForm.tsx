import React, { useState } from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { TextareaAutosize, Grid } from '@material-ui/core';
import StyledButton from '../styledButton/styledButton';
import ColoredText from '../coloredText/coloredText';
import { useContext } from 'react';
import ThemeContext, { Colors, theme } from '../../context/themeContext';

const makeStyledTextField = (colors: Colors) =>
  withStyles({
    root: {
      '& input': {
        color: colors.white,
      },
      '& label': {
        color: colors.pink,
      },
      '& .MuiInput-underline:before': {
        borderBottomColor: colors.pink,
      },
      '& label.Mui-focused': {
        color: colors.pink,
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: colors.pink,
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: colors.pink,
          color: colors.white,
        },
        '&:hover fieldset': {
          borderColor: colors.pink,
        },
        '&.Mui-focused fieldset': {
          borderColor: colors.purple,
        },
      },
    },
  })(TextField);

const useStyles = (colors: Colors) => {
  return makeStyles((theme: Theme) =>
    createStyles({
      root: {
        '& > *': {
          margin: theme.spacing(1),
          width: '25ch',
        },
      },
      text: {
        color: colors.white,
      },
      wide: {
        width: '100%',
      },
    })
  )();
};

const CssTextField = makeStyledTextField(theme);

export default function EmailForm() {
  const context = useContext(ThemeContext);
  const classes = useStyles(context);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = (e) => {
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        'form-name': 'contact',
        email: email,
        name: name,
        company: company,
        details: details,
      }),
    });

    setName('');
    setEmail('');
    setCompany('');
    setDetails('');

    e.preventDefault();
  };

  return (
    <div>
      <Grid item xs={12}>
        <h4>
          <ColoredText color={context.green}>Contact Me</ColoredText>
        </h4>
      </Grid>
      <form
        name="contact"
        className={classes.root}
        noValidate
        autoComplete="off"
        data-netlify={true}
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        <Grid item xs={12}>
          <CssTextField
            fullWidth={true}
            id="standard-basic"
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <CssTextField
            fullWidth={true}
            id="standard-basic"
            label="Name"
            type="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <CssTextField
            fullWidth={true}
            id="standard-basic"
            label="Company"
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextareaAutosize
            className={classes.wide}
            aria-label="minimum height"
            rowsMin={10}
            placeholder="Any further details"
            name="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <StyledButton isSubmit={true}>Submit</StyledButton>
        </Grid>
      </form>
    </div>
  );
}
