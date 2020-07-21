import React, {Component} from 'react';
import { timer, Subject } from 'rxjs';
import { map, takeWhile, takeUntil } from 'rxjs/operators';

import './Name.css'

export default class Name extends Component<{completeCallback: () => void},{value: string}> {
  private name: string;
  private unmount$: Subject<boolean>;

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }

    this.name = "hey, i'm cole."
    this.unmount$ = new Subject<boolean>();
  }

  componentDidMount() {
    this.subscribeToType();
  }

  componentWillUnmount() {
    this.unmount$.next();
    this.unmount$.unsubscribe();
  }

  private subscribeToType() {
    let index = 0;
    timer(0, 200)
      .pipe(
        takeWhile(() => this.state.value !== this.name),
        takeUntil(this.unmount$),
        map(() => {
          const char = this.name[index];
          index++;
          return char;
        })
      ).subscribe(
        char => this.setState({value: this.state.value + char}), 
        () => null,
        () => {
          if(this.state.value === this.name) {
            this.props.completeCallback();
          }
        });
  }

  render() {
    return (
      <div className="container"><div>$ {this.state.value}</div><div className="cursor"></div></div>
    )
  }
}