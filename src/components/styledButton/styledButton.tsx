import React from 'react';
import { withStyles, Button } from '@material-ui/core';
import { Colors, theme } from '../../context/themeContext';

const makeStyledButton = (colors: Colors) =>
  withStyles(() => ({
    root: {
      color: colors.white,
      backgroundColor: colors.purple,
      '&:hover': {
        backgroundColor: colors.purple,
      },
    },
  }))(Button);

const ColorButton = makeStyledButton(theme);

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
