import React, { Component } from 'react';
import './App.css';

import { subscribeToTimer } from './api';

class App extends Component {
  constructor(props) {
    super(props);
    subscribeToTimer((err, timestamp) => this.setState({ 
      timestamp 
    }));
  }

  state = {
    timestamp: 'no timestamp yet'
  };

  render() {
    return (
      <div className="App">
        <p className="App-intro">
        This is the timer value: {Math.round(this.state.timestamp.percent * 10000) / 10000 + '%'}
        </p>
        <p className="App-intro">
          days left: {Math.round(this.state.timestamp.left/86400000 * 10) / 10}
        </p>
        <div className="container">
          <div className="block" style={{height: this.state.timestamp.percent + '%'}}>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
