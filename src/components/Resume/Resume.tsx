import React from 'react';
import Grid from '@material-ui/core/Grid';
import StyledLink from '../StyledLink/StyledLink';
import Container from '@material-ui/core/Container';
import ColoredText from '../ColoredText/ColoredText';
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai';
import Project from '../Project/Project';
import {
  SpotifyLyrics,
  SupaMarketMetrics,
  VNetLab,
  AutomatedDocumentProcessor,
} from '../../objects/Projects';

import './Resume.css';
import Spacer from '../Spacer/Spacer';

export default function Resume() {
  const email = 'colefoos27@hotmail.com';
  const linkedInAddress = 'https://www.linkedin.com/in/colefoos/';
  const githubAddress = 'https://github.com/foosiee';
  const resumeLink =
    'https://docs.google.com/document/d/1kZnIdJevnbNIP4PkhYBKB-LquUr3riTyOVnX1I67dMk/edit?usp=sharing';

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
            Email: <StyledLink href={'mailto:' + email}>{email}</StyledLink>
          </p>
          <div className="regular-text">
            Phone #: <ColoredText color="#ffb86c">567-201-7931</ColoredText>
          </div>
        </Grid>

        <Grid item xs={6}>
          <div style={{ display: 'inline-block' }}>
            <p>
              Socials:
              <a
                href={linkedInAddress}
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
                href={githubAddress}
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
          <h4>
            <ColoredText color="#50fa7b">Experience</ColoredText>
          </h4>
          <div className="regular-text">
            <ColoredText color="#ffb86c">Amazon</ColoredText>,
            <ColoredText color="#f1fa8c">Remote</ColoredText> -{' '}
            <i>Software Development Engineer Intern</i>
          </div>
          <p>May 2020 - Present</p>
          <ul>
            <li>
              Develop new features on an Angular web application for customers
              to query data from AWS Athena and view the results in the
              application
            </li>
            <li>
              Design and implement event driven backend architecture to respond
              to a user’s query
            </li>
            <li>Worked with AWS, Java, Typescript, Angular</li>
          </ul>
          <div className="regular-text">
            <ColoredText color="#ffb86c">Onpoint Group</ColoredText>,
            <ColoredText color="#f1fa8c">Perrysburg, Ohio</ColoredText> -{' '}
            <i>Cloud Applications Developer Intern</i>
          </div>
          <p>Feb 2019 - May 2020</p>
          <ul>
            <li>
              Designed and implemented an automated document processing system
            </li>
            <li>
              Develop and maintain Power BI embedded websites written in React
              and C#
            </li>
            <li>Build serverless applications and APIs on AWS</li>
            <li>Refactored IOT applications</li>
            <li>
              Worked with AWS, Azure, Google Cloud Platform, Python, C#,
              Javascript, React
            </li>
          </ul>
        </Grid>

        <Grid item xs={12}>
          <h4>
            <ColoredText color="#50fa7b">Education</ColoredText>
          </h4>
          <div className="regular-text">
            <ColoredText color="#ffb86c">University of Toledo</ColoredText>,
            <ColoredText color="#f1fa8c">Toledo, Ohio</ColoredText> -{' '}
            <i>B.S in Computer Science</i>
          </div>
          <p>Aug 2016 - Dec 2020</p>
          <ul>
            <li>3.5 GPA</li>
            <li>Dean’s List - 2016, 2017</li>
            <li>Presidents List - 2019</li>
            <li>UT Writing Excellence Award</li>
            <li>Regent Scholarship Award</li>
          </ul>
        </Grid>

        <Grid item xs={12}>
          <h4>
            <ColoredText color="#50fa7b">Skills</ColoredText>
          </h4>
          <div style={{ display: 'inline-flex' }}>
            <ul>
              <li>Python</li>
              <li>React</li>
              <li>Java</li>
              <li>Amazon Web Services</li>
              <li>Azure</li>
            </ul>
            <ul>
              <li>Typescript</li>
              <li>Angular</li>
              <li>C#</li>
              <li>Google Cloud Platform</li>
              <li>Salesforce</li>
            </ul>
          </div>
        </Grid>

        <Grid item xs={12}>
          <h4>
            <ColoredText color="#50fa7b">Projects</ColoredText>
          </h4>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Project
                title={SpotifyLyrics.title}
                link={SpotifyLyrics.link}
                description={SpotifyLyrics.description}
              />
            </Grid>
            <Grid item xs={6}>
              <Project
                title={SupaMarketMetrics.title}
                link={SupaMarketMetrics.link}
                description={SupaMarketMetrics.description}
              />
            </Grid>
            <Grid item xs={6}>
              <Project
                title={VNetLab.title}
                link={VNetLab.link}
                description={VNetLab.description}
              />
            </Grid>
            <Grid item xs={6}>
              <Project
                title={AutomatedDocumentProcessor.title}
                link={AutomatedDocumentProcessor.link}
                description={AutomatedDocumentProcessor.description}
              />
            </Grid>
            <Grid item xs={6}>
              <StyledLink href={githubAddress}>
                See all projects on my GitHub
              </StyledLink>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Spacer amount={20} />
          <StyledLink href={resumeLink}>
            Link to my downloadable resume
          </StyledLink>
          <Spacer amount={10} />
        </Grid>
      </Grid>
    </Container>
  );
}
