import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: '#ff79c6'
    },
  }),
);

export default function StyledLink(props: {href: string, children?: any}) {
  const classes = useStyles();
  return (
    <Link className={classes.root} href={props.href} target="_blank">
      {props.children}
    </Link>
  )
}