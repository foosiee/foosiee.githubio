import React from 'react';
import StyledLink from '../StyledLink/StyledLink';
import Container from '@material-ui/core/Container';
import ColoredText from '../ColoredText/ColoredText';
import './Resume.css';

export default function Resume() {
  const email = 'colefoos27@hotmail.com'
  return (
    <Container maxWidth="lg" className="border">
      <div className="pad regular-text">
        <div style={{textAlign: 'center'}}><h3><ColoredText color="#bd93f9">Resume</ColoredText></h3></div>
        <p>Email: <StyledLink href={"mailto:" + email}>{email}</StyledLink></p>
        <p>Phone #: <ColoredText color="#ffb86c">567-201-7931</ColoredText></p>
      </div>
    </Container>
  )
}