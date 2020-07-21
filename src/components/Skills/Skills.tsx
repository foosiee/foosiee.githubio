import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ColoredText from '../ColoredText/ColoredText';

import './Skills.css';

export default function Skills() {
  return (
    <Container maxWidth="lg" className="border">
      <Grid container spacing={1}>
        <Grid item xs={12}>
            <div style={{textAlign: 'center'}}><h3><ColoredText color="#bd93f9">Skills</ColoredText></h3></div>
        </Grid>
        <Grid item xs={6}>
          <div className="regular-text"><img src="https://img.icons8.com/color/48/000000/python.png"/></div>
        </Grid>
        <Grid item xs={6}>
          <div className="regular-text"><img src="https://img.icons8.com/color/48/000000/typescript.png"/></div>
        </Grid>
        <Grid item xs={6}>
          <div className="regular-text"><img src="https://img.icons8.com/color/48/000000/react-native.png"/></div>
        </Grid>
        <Grid item xs={6}>
          <div className="regular-text"><img src="https://img.icons8.com/color/48/000000/angularjs.png"/></div>
        </Grid>
        <Grid item xs={6}>
          <div className="regular-text"><img src="https://img.icons8.com/color/48/000000/java-coffee-cup-logo.png"/></div>
        </Grid>
      </Grid>
    </Container>
  )
}