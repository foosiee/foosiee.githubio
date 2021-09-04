import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import StyledLink from '../styledLink/styledLink';
import ColoredText from '../coloredText/coloredText';
import { Project as ProjectType } from '../../types';
import ThemeContext, { Colors } from '../../context/themeContext';
import { useContext } from 'react';

const useStyles = (colors: Colors) =>
  makeStyles({
    root: {
      width: '100%',
      height: '100%',
      display: 'inline-block',
      backgroundColor: colors.black,
      border: '2px solid ' + colors.blue,
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
      color: colors.white,
    },
    link: {},
  })();

export default function Project(props: ProjectType) {
  const context = useContext(ThemeContext);
  const classes = useStyles(context);
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
