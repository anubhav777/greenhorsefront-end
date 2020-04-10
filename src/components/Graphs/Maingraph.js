import React, { Component } from 'react';
import Chart from 'react-apexcharts'
import axios from 'axios';
import update from 'immutability-helper'

class Maingraph extends Component {
    state={
      series: [{
        data: [21, 22, 10, 28, 16, 21, 13, 30]
      }],
      options: {
        chart: {
          height: 350,
          type: 'bar',
          events: {
            click: function(chart, w, e) {
              // console.log(chart, w, e)
            }
          }
        },
        colors:['#26a0fc', '#26e7a6', '#febc3b', '#ff6178', '#8b75d7','#6d848e','#46b3a9','#d830eb'],
        plotOptions: {
          bar: {
            columnWidth: '45%',
            distributed: true
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: [
            ['John', 'Doe'],
            ['Joe', 'Smith'],
            ['Jake', 'Williams'],
            'Amber',
            ['Peter', 'Brown'],
            ['Mary', 'Evans'],
            ['David', 'Wilson'],
            ['Lily', 'Roberts'], 
          ],
          labels: {
            style: {
              colors: ['#26a0fc', '#26e7a6', '#febc3b', '#ff6178', '#8b75d7','#6d848e','#46b3a9','#d830eb'],
              fontSize: '12px'
            }
          }
        }
      },
    
    
 
      
     
      files_data:[],
      token:'',
      cuurent_month:'',
      current_date:'',
      current_week:'1',
      call_method:'file',
      url_method:'overall',
      
      
      };
      UNSAFE_componentWillMount(){
        let date= new Date()
        let cuurent_month=('0' + (date.getMonth()+1)).slice(-2)
        let current_date= date.getFullYear() + '-'+ cuurent_month + '-'+('0' + date.getDate()).slice(-2)
        let token=localStorage.getItem('Token')
        this.setState({token:token,cuurent_month:cuurent_month,current_date:current_date})
      }
      // componentDidMount(){
        
      //   this.getdata()
      // }
      getdata=()=>{
          let new_stats='file'
          let datas=this.state.url_method
        axios.get(`http://localhost:5000/graph?stats=${datas}`,{
            headers:{
                'x-access-token':this.state.token,
                'send_methods':this.state.call_method,
                'curr_date':this.state.current_date,
                'months':this.state.cuurent_month,
                'days':this.state.current_week

            }
        })
        .then(res =>{
            // console.log(res.data+[.new_stats])
          let yaxis_title=null
            const new_file=res.data.data.map((val)=>{
                return val.total
            })
            const file_title=res.data.data.map((val,i,arr)=>{
                
                if(arr.length-1 === i){
                 let new_key=Object.keys(val)
                 yaxis_title=new_key[1]

                }
                return val.day
            })
            
            console.log(yaxis_title)
            let new_state=this.state.series
            const new_obj=update(new_state,{[0]:{name:{$set:'File'},data:{$set:new_file}}})
            let new_options=this.state.options
            const new_title=update(new_options,{xaxis:{categories:{$set:file_title}}})
            console.log(new_obj,new_state)
            this.setState({options:new_title,series:new_obj})
        })
      }
      updateval=(name)=>(e)=>{
         e.preventDefault()
        if(name === 'file' || name === 'question'){
           this.setState({call_method:name},()=>{
                this.getdata()
           })
       }
       else{
         this.setState({url_method:name},()=>{
           this.getdata()
         })

       }
  
      }
      updatedate=(e)=>{
        this.setState({current_date:e.target.value},()=>{
          this.getdata()
        })

      }
    
    render() {
        return (
<div className="content-wrapper">
  {/* Content Header (Page header) */}
  <div className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1 className="m-0 text-dark">Dashboard v2</h1>
        </div>{/* /.col */}
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item active">Dashboard v2</li>
          </ol>
        </div>{/* /.col */}
      </div>{/* /.row */}
    </div>{/* /.container-fluid */}
  </div>

  <section className="content">
    <div className="container-fluid">
      
    
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Monthly Recap Report</h5>
              <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                  <i className="fas fa-minus" />
                </button>
                <div className="btn-group">
                  <button type="button" className="btn btn-tool dropdown-toggle" data-toggle="dropdown">
                    <i className="fas fa-cogs" />
                  </button>
                  <div className="dropdown-menu dropdown-menu-right" role="menu">
                  <li className="dropdown-item" name='file' onClick={this.updateval('file')}>File</li>
                  <li className="dropdown-item" name='question' onClick={this.updateval('question')}>Question</li>
                  </div>
                </div>
                <div className="btn-group">
                  <button type="button" className="btn btn-tool dropdown-toggle" data-toggle="dropdown">
                    <i className="fas fa-wrench" />
                  </button>
                  <div className="dropdown-menu dropdown-menu-right" role="menu">
                    <li className="dropdown-item" onClick={this.updateval('overall')}>Overall</li>
                    <li className="dropdown-item" onClick={this.updateval('month')}>Weekly</li>
                    <li className="dropdown-item" onClick={this.updateval('date')}>Date</li>
                  </div>
                
                    {/* <select className="dropdown-menu dropdown-menu-right" role="menu">
                        <option>Overall</option>
                        <option>Weekly</option>
                        <options>Date</options>

                    </select> */}
                   <div className="btn-group">
                  <button type="button" className="btn btn-tool btn-sm daterange"  data-toggle="dropdown">
                    <i className="fas fa-calendar-alt" />
                    </button>
                    <div className="dropdown-menu dropdown-menu-right" style={{background:'#dc3545',color:'white'}} role="menu">
                    <input type='date' className="form-control" onChange={this.updatedate} />
                    </div>
                  {/* <div className="dropdown-menu dropdown-menu-right" role="menu">
                    <li className="dropdown-item" onClick={this.updateval('overall')}>Overall</li>
                    <li className="dropdown-item" onClick={this.updateval('month')}>Weekly</li>
                    <li className="dropdown-item" onClick={this.updateval('date')}>Date</li>
                  </div> */}
                 
                </div>
                </div>
                {/* <button type="button" className="btn btn-primary btn-sm daterange" data-toggle="tooltip" title="Date range">
                    <i class="far fa-calendar-alt"></i>
                  </button> */}
                <button type="button" className="btn btn-tool" data-card-widget="remove">
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>
            {/* /.card-header */}
            <div className="card-body">
              <div className="row">
                <div className="col-md-8">
                <Chart series={this.state.series} options={this.state.options} type="bar" height={350} width={750}/>
                 </div>
                {/* /.col */}
              </div>
              {/* /.row */}
            </div>
            {/* ./card-body */}
           
            {/* /.card-footer */}
          </div>
          {/* /.card */}
        </div>
        {/* /.col */}
      </div>
     
    </div>
  </section>

</div>

            
                // {/* <Chart series={this.state.series} options={this.state.options} type="line" height={350} width={500}/> */}
            
        );
    }
}

export default Maingraph;