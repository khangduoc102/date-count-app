import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    
  }

  resolveAfter1Seconds = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('resolved');
      }, 5000);
    });
  }

  state = {
    desDate: new Date("2018-08-04T15:00:00").getTime(),
    orgDate: new Date("2018-07-06T02:00:00").getTime(),
    timestamp: 'no timestamp yet'
  };

  componentDidMount= () => {
    const totalTime = this.state.desDate - this.state.orgDate;
    console.log(totalTime);
    window.setInterval(() => {
      this.setState(() => ({timestamp: {percent: (new Date().getTime() - this.state.orgDate) / totalTime * 100, left: this.state.desDate - new Date().getTime()}}));
    }, 1000)
  }

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
