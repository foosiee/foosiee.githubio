import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import StyledLink from '../StyledLink/StyledLink';
import ColoredText from '../ColoredText/ColoredText';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    display: 'inline-block',
    backgroundColor: '#282a36',
    border: '2px solid #8be9fd',
    borderRadius: '8px',
    overflow: 'auto',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  text: {
    color: '#f8f8f2',
  },
  link: {},
});

export default function Project(props: {
  title?: string;
  link?: string;
  description?: string;
}) {
  const classes = useStyles();
  const maxTextLength = 180;

  const addWhiteSpace = (text: string) => {
    const difference = maxTextLength - text.length;
    if (difference > 0) {
      const whitespace = new Array(difference).join('\u00A0');
      return text + whitespace;
    }
    return text;
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.text} variant="h5" component="h2">
          <ColoredText color="#ffb86c">{props.title}</ColoredText>
        </Typography>
        <Typography variant="body2" component="p">
          {addWhiteSpace(props.description)}
        </Typography>
      </CardContent>
      <CardActions>
        {props.link && <StyledLink href={props.link}>Learn More</StyledLink>}
      </CardActions>
    </Card>
  );
}
