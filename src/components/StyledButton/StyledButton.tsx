import React from 'react';
import { withStyles, Button } from '@material-ui/core';

const ColorButton = withStyles(() => ({
  root: {
    color: '#f8f8f2',
    backgroundColor: '#bd93f9',
    '&:hover': {
      backgroundColor: '#bd93f9',
    },
  },
}))(Button);

export default function StyledButton(props: {
  isSubmit?: boolean;
  children?: any;
}) {
  return (
    <div>
      {props.isSubmit ? (
        <ColorButton type="submit">{props.children}</ColorButton>
      ) : (
        <ColorButton>{props.children}</ColorButton>
      )}
    </div>
  );
}
