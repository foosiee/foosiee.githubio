import { Grid } from '@material-ui/core';
import React from 'react';
import { useContext } from 'react';
import ColoredText from '../coloredText/coloredText';
import ConfigContext from '../../context/configContext';
import Project from './project';
import ThemeContext from '../../context/themeContext';

export default function Projects() {
  const configContext = useContext(ConfigContext);
  const themeContext = useContext(ThemeContext);
  return (
    <div>
      <h4>
        <ColoredText color={themeContext.green}>Projects</ColoredText>
      </h4>
      <Grid container spacing={1}>
        {configContext.projects.map((project, i) => (
          <Grid item xs={6} key={i}>
            <Project
              title={project.title}
              link={project.link}
              description={project.description}
            ></Project>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
