import React from 'react';

export default function Spacer(props: { amount: number }) {
  return <div style={{ paddingTop: props.amount }}></div>;
}
