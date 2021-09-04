import React from 'react';
import { default as JobComp } from './job/job';
import ColoredText from '../coloredText/coloredText';
import { useContext } from 'react';
import ConfigContext from '../../context/configContext';
import ThemeContext from '../../context/themeContext';

export default function Experience() {
  const configContext = useContext(ConfigContext);
  const themeContext = useContext(ThemeContext);

  return (
    <div>
      <h4>
        <ColoredText color={themeContext.green}>Experience</ColoredText>
      </h4>
      {configContext.jobs.map((job, i) => (
        <JobComp job={job} key={i}></JobComp>
      ))}
    </div>
  );
}
