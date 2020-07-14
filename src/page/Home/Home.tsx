import React, {Component} from 'react';
import Box from '../../components/Box/Box';
import Name from '../../components/Name/Name';
import Collapse from '@material-ui/core/Collapse';

import './Home.css';

export default class Home extends Component<{}, {complete: boolean}> {
  constructor(props) {
    super(props);

    this.state = {
      complete: false
    }

    this.completeCallback = this.completeCallback.bind(this);
  }

  private completeCallback() {
    this.setState({complete: true});
    console.log('done')
  }

  render() {
    return (
      <div className="App">
      <div className="name-container">
        <Box className="name-box">
          <Name completeCallback={this.completeCallback}/>
        </Box>
        <Collapse in={this.state.complete}>
          <br />
          <Box className="">
            <div>test1232<br />132fewf</div>
          </Box>
        </Collapse>
      </div>
    </div>
    )
  }
}