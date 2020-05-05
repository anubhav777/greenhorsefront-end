import React, { Component } from 'react';
import Chart from "react-apexcharts";
import axios from 'axios'
class Graphdash extends Component {
    state={
        options: {
            chart: {
              id: "bar"
            },     animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            },
            plotOptions:{
                bar:{
                    columnWidth: '75%',
                }
            },
            dataLabels:{
                enabled:false,
                enabledonSeries:true
            },
            xaxis: {
              categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
            }
          },
          series: [
            {
              name: "File",
              data: [30, 40, 45, 50, 49, 60, 70, 91]
            },
            {
                name:'Question',
                data:[20,10,30,40,60,25,35,70]
            },
            
          ],
          datrepicker:''
     
    }
    updateval=(e)=>{
    
      let new_date=e.target.value
      let token=localStorage.getItem('Token')
      axios.get(`https://greehorsebackend.herokuapp.com/graph?stats=date`,{
        headers:{
          'curr_date':new_date,
          'x-access-token':token
        }
      })
      .then(res =>{
      
        let new_file=res.data.file.map((val)=>{
          return val.total
        })
     
        let series=[...this.state.series]
        series[0]={name: "File",data:new_file}
        this.setState({series})

      })
    }
    render() {
        return (
            <div>
              <input type='date' name='datrepicker' onChange={this.updateval}/>
                 <Chart
              options={this.state.options}
              series={this.state.series}
            //   animations={this.state.animations}
              type="bar"
              width="500"
            />
            </div>
        );
    }
}

export default Graphdash;