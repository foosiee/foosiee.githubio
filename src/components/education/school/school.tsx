import React from 'react';
import { useContext } from 'react';
import ThemeContext from '../../../context/themeContext';
import { Education } from '../../../types';
import ColoredText from '../../coloredText/coloredText';

interface Props {
  school: Education;
}
export default function School(props: Props) {
  const context = useContext(ThemeContext);
  return (
    <div>
      <div>
        <ColoredText color={context.orange}>{props.school.school}</ColoredText>,{' '}
        <ColoredText color={context.yellow}>
          {props.school.location}
        </ColoredText>{' '}
        - <i>{props.school.awarded}</i>
      </div>
      <p>{props.school.date}</p>
      <ul>
        {props.school.details.map((detail) => (
          <li key={detail}>{detail}</li>
        ))}
      </ul>
    </div>
  );
}
