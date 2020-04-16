import React, { Component } from 'react';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
class Newcalendar extends Component {
   
    render() {
        return (
            <div className='col-md-3' style={{position:'absolute'}}>
  <div className="card card-danger">
    {/* <div className="card-header">
      <h3 className="card-title">Different Width</h3>
    </div> */}
    <div className="card-body">
      <div className="row">
        <div className="col-5">
          {/* <input type="text" className="form-control" placeholder=".col-3" /> */}
          <select className="form-control">
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
        <div className="col-5">
        <select className="form-control">
          <option value='1'>First Week</option>
          <option value='2'>Second Week</option>
          <option value='3'>Third Week</option>
          <option value='4'>Fourth Week</option>
          </select>
        </div>
        
       
        </div>
        <div style={ml} className="col-4">
        <button type='button' class="btn btn-block btn-info">Update</button>
      </div>
    
      
    </div>
    {/* /.card-body */}
  </div>
  </div>


        );
    }
}
const ml={
    marginTop:'10px',
    marginLeft:'22%'
}
export default Newcalendar;