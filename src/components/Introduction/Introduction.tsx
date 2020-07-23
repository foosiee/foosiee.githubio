import React, { Component } from 'react';
import StyledLink from '../StyledLink/StyledLink';
import './Introduction.css';

export default class Introduction extends Component {
  render() {
    return (
      <div className="regular-text">
        Hello! Thank you for checking out my website. As you may have guessed
        I'm Cole Foos and I'm a software engineer. I'm from the Toledo, Ohio
        area and I'm a senior computer science student out of the
        <StyledLink href="https://www.utoledo.edu/">
          {' '}
          University of Toledo
        </StyledLink>{' '}
        graduating December 2020. Some of my favorite things to work with in
        tech is AWS Lambda functions, Typescript, React, Angular and Python.
        Outside of tech I love to watch and play sports, listen to music, play
        guitar and play video games.
      </div>
    );
  }
}
