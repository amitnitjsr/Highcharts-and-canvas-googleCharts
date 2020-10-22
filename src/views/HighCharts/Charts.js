import React, { Component } from 'react';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import './graph.css';
import Axios from 'axios';

export default class google extends Component {
  state ={
    data: [[]],
  }

  dataFormatter=(data)=>{
   let tmp =[];
   for(let i=0; i<data.length; i++){
     let t =[];
     t.push( Date.parse((data[i].datetime)));
     t.push(data[i].temperature)
     tmp.push(t)
   }
   return tmp;
  }

componentDidMount(){
  Axios.get('https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/usdeur.json')
  .then((res)=>{
//   let formatData = this.dataFormatter(res.data);
  console.log('tmp', res.data)
    this.setState({data: res.data});
  })
  .catch((error)=>{
  console.log('Error', error);
  })
}

  render() {

    var config = {
      chart: {
        zoomType: 'x',
        // height: 100,
        //   width: 300,
          // plotAreaWidth: 300,
          // plotAreaHeight: 200
      },
      title: {
        text: ''
      },
      // subtitle: {
      //   text: document.ontouchstart === undefined ?
      //     'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
      // },
      xAxis: {
        type: 'datetime',
        // labels: { 
        //   formatter: function() { 
        //     return Highcharts.dateFormat('%H:%M %d %b %Y', 
        //                                   this.value); 
        //   } 
        // } 
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        area: {
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [0, Highcharts.getOptions().colors[0]],
              [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
            ]
          },
          marker: {
            radius: 2
          },
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 1
            }
          },
          threshold: null
        }
      },
      series: [{
        type: 'area',
        name: 'Temperature',
        data: this.state.data
      }]
    };

    return (
      <div >
    <HighchartsReact highcharts={Highcharts} options={config} />
      </div>
    )
  }
}
