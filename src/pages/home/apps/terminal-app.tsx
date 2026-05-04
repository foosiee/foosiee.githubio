import React from 'react';
import { TerminalWindowProps } from './shared';

export function TerminalApp(props: TerminalWindowProps) {
  return (
    <div className="terminal-window">
      <div className="terminal-screen">
        {props.terminalHistory.map((line, index) => (
          <p key={`${line}-${index}`}>{line}</p>
        ))}
      </div>
      <form className="terminal-form" onSubmit={props.handleTerminalSubmit}>
        <label htmlFor="terminal-input">C:\&gt;</label>
        <input
          id="terminal-input"
          autoComplete="off"
          spellCheck={false}
          value={props.terminalInput}
          onChange={(event) => props.setTerminalInput(event.target.value)}
        />
      </form>
    </div>
  );
}
