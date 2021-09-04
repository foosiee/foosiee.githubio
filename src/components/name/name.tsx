import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { timer, Subject } from 'rxjs';
import { map, takeWhile, takeUntil } from 'rxjs/operators';
import ThemeContext from '../../context/themeContext';
import ColoredText from '../coloredText/coloredText';

import './name.css';

export default function Name(props: { completeCallback: () => void }) {
  const name = 'export name=cole';
  const [nameValue, setNameValue] = useState('');
  const unmount$ = new Subject();
  const context = useContext(ThemeContext);

  const subscribeToType = () => {
    let index = 0;
    let currSubString = '';
    timer(0, 200)
      .pipe(
        takeWhile(() => currSubString !== name),
        map(() => {
          const char = name[index];
          index++;
          return char;
        }),
        takeUntil(unmount$)
      )
      .subscribe(
        (char) => {
          currSubString = currSubString + char;
          setNameValue(currSubString);
        },
        () => undefined,
        () => (nameValue === name ? props.completeCallback() : undefined)
      );
  };

  useEffect(() => {
    subscribeToType();
    return () => {
      unmount$.next();
      unmount$.unsubscribe();
    };
  }, []);

  return (
    <div className="container">
      <ColoredText color={context.green}>$ {nameValue}</ColoredText>
      <div className="cursor"></div>
    </div>
  );
}
