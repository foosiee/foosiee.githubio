import React, {Component, useState} from 'react';
import Box from '../../components/Box/Box';
import Name from '../../components/Name/Name';
import NavPanel from '../../components/NavPanel/NavPanel';
import Spacer from '../../components/Spacer/Spacer';
import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Resume from '../../components/Resume/Resume';

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
  const [complete, setComplete] = useState(false);
  const classes = useStyles();

  const completeCallback = () => {
    //this.setState({complete: true});
    console.log('done')
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Name completeCallback={completeCallback}/>
        </Grid>
        <Grid item xs={12}>
          <Introduction />
        </Grid>
        <Grid item xs={12}>
          <Resume />
        </Grid>
      </Grid>
    </div>
  );
}