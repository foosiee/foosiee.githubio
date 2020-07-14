import React from 'react';

import './Box.css';

export default function Box(props: {
  className?: string;
  children: JSX.Element;
}) {
  return (
    <div className={"border " + props.className}>
      {props.children}
    </div>
  )
}