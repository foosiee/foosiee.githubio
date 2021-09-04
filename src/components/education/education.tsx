import React from 'react';
import School from './school/school';
import ColoredText from '../coloredText/coloredText';
import { useContext } from 'react';
import ConfigContext from '../../context/configContext';
import ThemeContext from '../../context/themeContext';

export default function EducationComponent() {
  const configContext = useContext(ConfigContext);
  const themeContext = useContext(ThemeContext);
  return (
    <div>
      <h4>
        <ColoredText color={themeContext.green}>Education</ColoredText>
      </h4>
      {configContext.education.map((school, i) => (
        <School school={school} key={i}></School>
      ))}
    </div>
  );
}
