import React from 'react';
import Grid from '@material-ui/core/Grid';
import StyledLink from '../styledLink/styledLink';
import Container from '@material-ui/core/Container';
import ColoredText from '../coloredText/coloredText';
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai';
import Projects from '../projects/projects';
import Experience from '../experience/experience';
import Education from '../education/education';
import Skills from '../skills/skills';

import './resume.css';
import Spacer from '../spacer/spacer';
import { useContext } from 'react';
import ConfigContext from '../../context/configContext';

export default function Resume() {
  const context = useContext(ConfigContext);

  return (
    <Container maxWidth="lg" className="border">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <div style={{ textAlign: 'center' }}>
            <h3>
              <ColoredText color="#bd93f9">Resume</ColoredText>
            </h3>
          </div>
        </Grid>

        <Grid item xs={6}>
          <p>
            Email:{' '}
            <StyledLink href={'mailto:' + context.email}>
              {context.email}
            </StyledLink>
          </p>
        </Grid>

        <Grid item xs={6}>
          <div style={{ display: 'inline-block' }}>
            <p>
              Socials:
              <a
                href={context.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <AiFillLinkedin
                  style={{ verticalAlign: 'text-bottom' }}
                  className="linkedIn"
                  size="1.5em"
                />
              </a>
              <a
                href={context.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <AiFillGithub
                  style={{ verticalAlign: 'text-bottom' }}
                  className="github"
                  size="1.5em"
                />
              </a>
            </p>
          </div>
        </Grid>

        <Grid item xs={12}>
          <Experience />
        </Grid>

        <Grid item xs={12}>
          <Education />
        </Grid>

        <Grid item xs={12}>
          <Skills />
        </Grid>

        <Grid item xs={12}>
          <Projects />
          <Grid item xs={6}>
            <Spacer amount={5} />
            <StyledLink href={context.github}>
              See all projects on my GitHub
            </StyledLink>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Spacer amount={20} />
          <StyledLink href={context.resume}>
            Link to my downloadable resume
          </StyledLink>
          <Spacer amount={10} />
        </Grid>
      </Grid>
    </Container>
  );
}
