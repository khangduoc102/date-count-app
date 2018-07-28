import React, { Component } from 'react';
import './App.css';

class App extends Component {

  resolveAfter1Seconds = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('resolved');
      }, 5000);
    });
  }

  state = {
    from: null,
    to: null,
    desDate: new Date("2018-08-04T15:00:00").getTime(),
    orgDate: new Date("2018-07-06T02:00:00").getTime(),
    totalTime: null,
    timestamp: 0
  };

  componentDidMount= () => {
    window.setInterval(() => {
      this.setState(() => ({timestamp: {percent: (new Date().getTime() - this.state.orgDate) / (this.state.desDate - this.state.orgDate) * 100, left: this.state.desDate - new Date().getTime()}}));
    }, 1000)
  }


  setDefault= () => {
    console.log("run");
    this.setState(() => ({
      desDate: new Date("2018-08-04T15:00:00").getTime(),
      orgDate: new Date("2018-07-06T02:00:00").getTime()
    }))
  }

  handleFromChange = (e) => {
    this.setState({from: e.target.value})
  }

  handleToChange = (e) => {
    this.setState({to: e.target.value})
  }

  onSubmit = (e) =>{
    e.preventDefault();
    if(this.state.from != null && this.state.to != null){
      this.setState((state) => ({
        desDate: new Date(state.to).getTime(),
        orgDate: new Date(state.from).getTime(),
      }))
    }
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.onSubmit}>
          <table>
            <tbody>
              <tr><th>Ngày đi (from)</th><td><input type="date" name="from" value={this.state.from} onChange={this.handleFromChange}/></td></tr>
              <tr><th>Ngày về (to)</th><td><input type="date" name="to" value={this.state.to} onChange={this.handleToChange}/></td></tr>
              <tr><td><input type="submit" name="Apply"/></td><td><button onClick={this.setDefault}>Set default</button></td></tr>
            </tbody>
          </table>
          
        </form>
        <div className="container">
          <div className="block" style={{height: this.state.timestamp.percent + '%'}}>
            <p>{this.state.timestamp.percent ? Math.round(this.state.timestamp.percent * 10000) / 10000 + '%' : 'Loading...'}</p>
          </div>
        </div>
        <p className="App-intro">
          days left: {this.state.timestamp.percent ? Math.round(this.state.timestamp.left/86400000 * 10) / 10 : 'Loading...'}
        </p>
      </div>
    );
  }
}

export default App;
