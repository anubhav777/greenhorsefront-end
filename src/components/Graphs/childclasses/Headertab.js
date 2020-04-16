import React, { Component } from 'react';
import axios from 'axios'

class Headertab extends Component {
    state={
        data:{},
        target:null

    }
    componentWillMount(){
        let token=localStorage.getItem('Token')
        this.getdata(token)

    }
    getdata=(token)=>{
        axios.get('https://greehorsebackend.herokuapp.com/graph',{
            headers:{
                'x-access-token':token
            }
        })
        .then(res=>{
            console.log(res.data)
            let newtarget=(res.data.loginneduser * 60)
            let target_complete=Math.round(((res.data.files/newtarget) * 100))
            this.setState({data:res.data,target:target_complete})
        })
    }
    render() {
       
        return (
         
              
              <div className="row">
                <div className="col-12 col-sm-6 col-md-3">
                  <div className="info-box">
                    <span className="info-box-icon bg-info elevation-1"><i className="fas fa-upload" /></span>
                    <div className="info-box-content">
                      <span className="info-box-text">Total Question Uploaded</span>
                      <span className="info-box-number">
                      {this.state.data.questions}
                        
                      </span>
                    </div>
                    {/* /.info-box-content */}
                  </div>
                  {/* /.info-box */}
                </div>
                {/* /.col */}
                <div className="col-12 col-sm-6 col-md-3">
                  <div className="info-box mb-3">
                    <span className="info-box-icon bg-primary elevation-1"><i className="fas fa-file-word" /></span>
                    <div className="info-box-content">
                      <span className="info-box-text">Total Files Uploaded</span>
                    <span className="info-box-number">{this.state.data.file}</span>
                    </div>
                    {/* /.info-box-content */}
                  </div>
                  {/* /.info-box */}
                </div>
                {/* /.col */}
                {/* fix for small devices only */}
                <div className="clearfix hidden-md-up" />
                <div className="col-12 col-sm-6 col-md-3">
                  <div className="info-box mb-3">
                    <span className="info-box-icon bg-danger elevation-1"><i className="fas fa-bullseye" /></span>
                    <div className="info-box-content">
                      <span className="info-box-text">Target Completed</span>
        <span className="info-box-number">{this.state.target} %</span>
                    </div>
                    {/* /.info-box-content */}
                  </div>
                  {/* /.info-box */}
                </div>
                {/* /.col */}
                <div className="col-12 col-sm-6 col-md-3">
                  <div className="info-box mb-3">
                    <span className="info-box-icon bg-warning elevation-1"><i className="fas fa-users" /></span>
                    <div className="info-box-content">
                      <span className="info-box-text">Active Members</span>
        <span className="info-box-number">{this.state.data.loginneduser}</span>
                    </div>
                    {/* /.info-box-content */}
                  </div>
                  {/* /.info-box */}
                </div>
                {/* /.col */}
              </div>
           
      
        );
    }
}

export default Headertab;