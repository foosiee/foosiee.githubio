import React from 'react';
import { CommonWindowProps, ExternalLink } from './shared';

export function ContactApp(props: CommonWindowProps) {
  return (
    <div className="contact-card">
      <p className="prompt-line">C:\&gt; ping cole@foos.dev</p>
      <p className="supporting-text">
        Open to product engineering roles, interesting builds, and technical
        conversations.
      </p>
      <div className="contact-links">
        <a href={`mailto:${props.config.email}`}>{props.config.email}</a>
        <ExternalLink href={props.config.linkedin}>
          LinkedIn profile
        </ExternalLink>
        <ExternalLink href={props.config.github}>GitHub profile</ExternalLink>
      </div>
    </div>
  );
}
