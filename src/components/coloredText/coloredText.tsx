import React from 'react';

export default function ColoredText(props: { color: string; children?: any }) {
  return (
    <div style={{ color: props.color, display: 'inline-block' }}>
      {props.children}
    </div>
  );
}
