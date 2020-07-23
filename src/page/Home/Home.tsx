import React from 'react';
import Name from '../../components/Name/Name';
import Grid from '@material-ui/core/Grid';
import Resume from '../../components/Resume/Resume';
import EmailForm from '../../components/EmailForm/EmailForm';

import './Home.css';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import Introduction from '../../components/Introduction/Introduction';

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
  }),
);

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Name completeCallback={() => {}}/>
        </Grid>
        <Grid item xs={12}>
          <Introduction />
        </Grid>
        <Grid item xs={12}>
          <Resume />
        </Grid>
        <Grid item xs={12} style={{textAlign: 'center'}}>
          <div style={{display: 'inline-block'}}>
            <EmailForm/>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}