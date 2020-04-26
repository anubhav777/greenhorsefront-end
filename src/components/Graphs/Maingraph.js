import React, { Component } from 'react';
import Chart from 'react-apexcharts'
import axios from 'axios';
import update from 'immutability-helper'


class Maingraph extends Component {
    state={
      series: [{
        name:'Total',
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
    
    
 
      
      full_array:[],
      files_data:'',
      cuurent_month:'',
      current_date:'',
      current_week:'1',
      call_method:'file',
      url_method:'overall',
      graph_title:'',
      stats:false,
      usertype:''
      
      
      };
      UNSAFE_componentWillMount(){
        let date= new Date()
        let cuurent_month=('0' + (date.getMonth()+1)).slice(-2)
        let current_date= date.getFullYear() + '-'+ cuurent_month + '-'+('0' + date.getDate()).slice(-2)
        console.log(current_date)
       
       
        this.setState({cuurent_month:cuurent_month,current_date:current_date})
      }
      componentDidMount(){
        if(this.props.token){
          let new_usertype=localStorage.getItem('Usertype')
          this.setState({usertype:new_usertype})
          this.getdata()
        }
      }
      getdata=()=>{
          
          let datas=this.state.url_method
        axios.get(`http://greenhorsebackend.eba-6m8y2epd.us-west-2.elasticbeanstalk.com/graph?stats=${datas}`,{
            headers:{
                'x-access-token':this.props.token,
                'send_methods':this.state.call_method,
                'curr_date':this.state.current_date,
                'months':this.state.cuurent_month,
                'days':this.state.current_week

            }
        })
        .then(res =>{
            // console.log(res.data+[.new_stats])
          let yaxis_title=null
          let spliced_array=null
          if(res.data.data.length >7){
              res.data.data=[...res.data.data].splice(0,7)
              console.log(res.data.data)
          }
            const new_file=res.data.data.map((val)=>{
                return val.total
            })
            const file_title=res.data.data.map((val,i,arr)=>{
                
                if(arr.length-1 === i){
                 let new_key=Object.keys(val)
                 yaxis_title=new_key[1]

                }
                return val.y_axis
            })
            
            console.log(res.data)
            let new_state=this.state.series
            const new_obj=update(new_state,{[0]:{data:{$set:new_file}}})
            let new_options=this.state.options
            const new_title=update(new_options,{xaxis:{categories:{$set:file_title}}})
            
            this.setState({options:new_title,series:new_obj,graph_title:res.data.title,full_array:res.data.data})
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
      updatedate=async (e)=>{
        // this.setState({current_date:this.formatIsoDate(e),url_method:'date'},()=>{
        //   this.getdata()
        console.log(e.target.name)
        this.setState({[e.target.name]:e.target.value})
        
       if(e.target.name === 'current_date'){
          await this.setState({url_method:'date'},()=>{
            this.getdata()
          })
        }
        else{
          this.setState({url_method:'month'})  
        }
            
        
       
       
      }
      chngestats=(e)=>{
        e.preventDefault()
        this.setState({stats:!this.state.stats})
      }
    
    render() {
        return (


  <section >
   
      
    
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
        <h5 className="card-title">{this.state.graph_title}</h5>
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
                <div style={this.state.usertype !== 'admin' ? {display:'none'} : {display:'inline-block'}} className="btn-group">
                  <button type="button" className="btn btn-tool dropdown-toggle" data-toggle="dropdown" onClick={(e) =>{e.preventDefault(); this.setState({stats: ! this.state.stats})}}>
                    <i className="fas fa-wrench" />
                  </button>
                  <div className="dropdown-menu dropdown-menu-right" role="menu">
                    <li className="dropdown-item" onClick={this.updateval('overall')}>Overall</li>
                    <li className="dropdown-item" onClick={this.updateval('month')}>Weekly</li>
                    <li className="dropdown-item" onClick={this.updateval('date')}>Date</li>
                  </div>
                   {this.state.url_method === 'month' ?
                   <div style={this.state.usertype !== 'admin' ? {display:'none'} :{display:'inline-block'}} className="btn-group">
                  <button className="btn btn-tool btn-sm daterange"  onClickCapture={(e)=>{e.preventDefault(); this.setState({stats:!this.state.stats})}}>
                    <i className="fas fa-calendar-alt" />
                    </button>
                     <div style={!this.state.stats ? {display:'none'} : disp} role="menu">
                    <div className='row' >
                    <div className="col-5" style={{marginLeft:'15px'}}>
                    <select name='cuurent_month'  onChange={this.updatedate} className="form-control">
                          <option value='01'>Jan</option>
                          <option value='02'>Feb</option>
                          <option value='03'>Mar</option>
                          <option value='04'>Apr</option>
                          <option value='05'>May</option>
                          <option value='06'>Jun</option>
                          <option value='07'>Jul</option>
                          <option value='08'>Aug</option>
                          <option value='09'>Sep</option>
                          <option value='10'>Oct</option>
                          <option value='11'>Nov</option>
                          <option value='12'>Dec</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <select name='current_week'  onChange={this.updatedate} className="form-control">
                          <option value='1'>First Week</option>
                          <option value='2'>Second Week</option>
                          <option value='3'>Third Week</option>
                          <option value='4'>Fourth Week</option>
                          </select>
                          </div>
                  </div>
                  <div style={ml} className="col-4">
                    <button type='button' class="btn btn-block btn-info" onClick={async (e) =>{ e.preventDefault(); await this.getdata(); this.setState({stats : false})}}>Update</button>
                  </div>
                  </div>
                  </div>
                   :
                    ''
                  }
                  {this.state.url_method === 'date' ?                 
                   <div style={this.state.usertype !== 'admin' ? {display:'none'} : {display:'inline-block'}} className="btn-group">
                  <button type="button" className="btn btn-tool dropdown-toggle" data-toggle="dropdown">
                    <i className="fas fa-calendar-alt" />
                    </button>
                  <div className="dropdown-menu dropdown-menu-right" role="menu">
                  <input type='date' name='current_date' className="form-control" onChange={this.updatedate} />

              </div>
              </div>: ''}
                                  
                <button type="button" className="btn btn-tool" data-toggle="dropdown" data-card-widget="remove">
                  <i className="fas fa-times" />
                </button>
                </div>
              </div>
            </div>
            {/* /.card-header */}
            <div className="card-body">
              <div className="row">
                <div className="col-md-7">
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
<div className="col-md-4">

  {/* /.card */}
  <div className="card" style={{height:'450px'}}>
    <div className="card-header" style={{height:'49px'}}>
      <h3 className="card-title">Striped Full Width Table</h3>
    </div>
    {/* /.card-header */}
    <div className="card-body p-0">
      {/* <table className="table table-striped"> */}
     
<table id="example2" className="table table-striped">
  <thead>
    <tr>
      <th style={{width: 10}}>#</th>
        <th>{this.state.url_method === 'date' ? 'Username' : 'Day'}</th>
      <th>Date</th>
      <th style={{width: 40}}>Total</th>
    </tr>
  </thead>
  <tbody>
    
          {this.state.full_array.map((val,i)=>{
            if(i <=6){
              return(
              
                <tr>
                  <td>{i+1}</td>
                    <td>{val.y_axis}</td>
              <td>{val.date}</td>
              <td>{val.total}</td>
                </tr>
              )
            }
            
            
         
          })}
  </tbody>
</table>


      {/* </table> */}
    </div>
    {/* /.card-body */}
  </div>
  {/* /.card */}
</div>
{/* /.col */}

      </div>
     
    
  </section>


            
                // {/* <Chart series={this.state.series} options={this.state.options} type="line" height={350} width={500}/> */}
            
        );
    }
}
const ml={
  marginTop:'10px',
  marginLeft:'35%'
}
const disp={
  
    position: 'absolute',
    willChange: 'transform',
    left: '0px',
    transform: 'translate3d(-116px, 19px, 0px)',
    top: '100%',
    zIndex: '1000',
    float: 'left',
    minWidth: '10rem',
    padding: '.5rem 0',
    margin: '.125rem 0 0',
    fontSize: '1rem',
    color: '#212529',
    textAlign: 'left',
    listStyle: 'none',
    backgroundColor:'#fff',
    backgroundClip: 'padding-box',
    border: '1px solid rgba(0,0,0,.15)',
    borderRadius: '.25rem',
    boxShadow: '0 0.5rem 1rem rgba(0,0,0,.175)',
    width:'300px',height:'100px',marginLeft:'-100px'

}
const frm={
  position:'absolute'
}
export default Maingraph;