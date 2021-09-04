import React from 'react';
import { useContext } from 'react';
import ThemeContext from '../../../context/themeContext';
import { Job } from '../../../types';
import ColoredText from '../../coloredText/coloredText';

interface Props {
  job: Job;
}
export default function JobComponent(props: Props) {
  const context = useContext(ThemeContext);
  return (
    <div>
      <div>
        <ColoredText color={context.orange}>{props.job.company}</ColoredText>,{' '}
        <ColoredText color={context.yellow}>{props.job.location}</ColoredText> -{' '}
        <i>{props.job.title}</i>
      </div>
      <p>{props.job.date}</p>
      <ul>
        {props.job.details.map((detail) => (
          <li key={detail}>{detail}</li>
        ))}
      </ul>
    </div>
  );
}
