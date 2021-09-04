import React from 'react';
import Name from '../../components/name/name';
import Grid from '@material-ui/core/Grid';
import Resume from '../../components/resume/resume';
import EmailForm from '../../components/emailForm/emailForm';

import './home.css';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import Introduction from '../../components/introduction/introduction';
import StyledLink from '../../components/styledLink/styledLink';
import { useContext } from 'react';
import ThemeContext from '../../context/themeContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: '15px',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  })
);

export default function Home() {
  const classes = useStyles();
  const theme = useContext(ThemeContext);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Name completeCallback={() => {}} />
        </Grid>
        <Grid item xs={12}>
          <Introduction />
        </Grid>
        <Grid item xs={12}>
          <Resume />
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-block' }}>
            <EmailForm />
          </div>
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-block' }}>
            <p style={{ color: theme.muted }}>
              Styling based on my favorite text editor theme{' '}
              <StyledLink href="https://draculatheme.com/">Dracula</StyledLink>
            </p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
