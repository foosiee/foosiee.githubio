import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useContext } from 'react';
import ThemeContext, { Colors } from '../../context/themeContext';

const useStyles = (colors: Colors) =>
  makeStyles((theme: Theme) =>
    createStyles({
      root: {
        color: colors.pink,
      },
    })
  )();

export default function StyledLink(props: { href: string; children?: any }) {
  const context = useContext(ThemeContext);
  const classes = useStyles(context);
  return (
    <Link className={classes.root} href={props.href} target="_blank">
      {props.children}
    </Link>
  );
}
