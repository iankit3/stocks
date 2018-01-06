import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Line as LineChart} from "react-chartjs"

var baseurl = "http://localhost:9999";
var options = {
  responsive: true,
  hoverMode: 'index',
  stacked: false,
  title:{
      display: true,
      text:'Chart.js Line Chart - Multi Axis'
  },
  scales: {
      yAxes: [{
          type: "linear",
          display: true,
          position: "left",
          id: "y-axis-1",
      }]
  }
}
var lineChartData = {
  labels: [],
  datasets: [{
      label: "Stocks",
      borderColor: [],
      backgroundColor: [],
      fill: true,
      data: [],
      yAxisID: "y-axis-1",
  }]
};


class App extends Component {

  constructor(){
    super();
    this.state = {
      didDataChanged : false,
      lineChartData: lineChartData,
      topStocks:[]
    }
  }

  componentDidMount() {
    fetch( baseurl+"/api/stocks/msft")
      .then(raw => raw.json() )
      .then((res) => {
        var d = res.data.map((elem) => {
            return elem.close
        })
        var l = res.data.map((elem) => {
          return elem.date
        })
         this.setState({
           didDataChanged:true,
           lineChartData: Object.assign({},
              this.state.lineChartData,{
                datasets:[Object.assign({},[],{data:d})],
                labels:l  
              })
          })
      })

      fetch( baseurl+"/api/topstocks")
        .then(raw => raw.json() )
        .then((res) => {
          this.setState({topStocks:res})
        })
  }
  

  render() {
    console.log(lineChartData.datasets.data)
    return (
      <div className="App" style={{width:"90vw",margin:"auto"}}>
        <div>
          <ul className="topstocks">
            {this.state.topStocks.map((elem,i) => {
               return(
                 <li>{elem.symbol+":"+elem.high}</li>
               ) 
            })}
          </ul>
        </div>
        <LineChart data={this.state.lineChartData} options={options} />
      </div>
    );
  }
}

export default App;
