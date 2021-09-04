import React from 'react';
import { useContext } from 'react';
import ConfigContext from '../../context/configContext';
import { chunk } from 'lodash';
import ColoredText from '../coloredText/coloredText';

export default function Skills() {
  const context = useContext(ConfigContext);
  return (
    <div>
      <h4>
        <ColoredText color="#50fa7b">Skills</ColoredText>
      </h4>
      <div style={{ display: 'inline-flex' }}>
        {chunk(context.skills, 5).map((arr, i) => (
          <ul key={i}>
            {arr.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
