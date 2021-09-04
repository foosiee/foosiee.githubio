import React from 'react';
import StyledLink from '../styledLink/styledLink';

export default function Introduction() {
  return (
    <div>
      Hello! Thank you for checking out my website. As you may have guessed I'm
      Cole Foos and I'm a software engineer. I'm from the Toledo, Ohio area and
      I graduated from the
      <StyledLink href="https://www.utoledo.edu/">
        {' '}
        University of Toledo
      </StyledLink>{' '}
      with a degree in Computer Science. Some of my favorite things to work with
      in tech are AWS Lambda functions, Typescript, React, Angular and Python.
      Outside of tech I love to watch and play sports, listen to music, play
      guitar and play video games.
    </div>
  );
}
