import React, { Component } from 'react';
import axios from 'axios'

class Allquestion extends Component {
    state={
        bla:[],
        disp:"none"
    }
    componentWillMount(){
        // fetch('http://localhost:5000/tryuser')
      this.datafetcher()
    }
    datafetcher=()=>{
        let token=localStorage.getItem('Token')
        axios.get('http://localhost:5000/getallquestion/overall',{
            headers:{
                
                'x-access-token':token

            }
        })
        
        .then(res =>{
            console.log(res.data)
            
            this.setState({bla:res.data.data})
            if (res.data.user==="admin"){
                this.setState({disp:""})
            }
        })
    }
    delete=(id)=>(e)=>{
        e.preventDefault()
        let token=localStorage.getItem('Token')
        axios.delete(`http://localhost:5000/deletequestion/${id}`,{
            headers:{
                'x-access-token':token
            }
        })
        .then(res =>{
            console.log(res.data)
            this.datafetcher()
        })
    }
    componentDidMount(){
    
        const script=document.createElement("script")

        script.src='../../js/table.js'
        script.async=true;

        document.body.appendChild(script)
    }
    render() {
        return (
            <div>
<div className="content-wrapper">
  {/* Content Header (Page header) */}
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>DataTables</h1>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item active">DataTables</li>
          </ol>
        </div>
      </div>
    </div>{/* /.container-fluid */}
  </section>
  {/* Main content */}
  <section className="content">
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">DataTable with minimal features &amp; hover style</h3>
          </div>
          {/* /.card-header */}
          <div className="card-body">
            <table id="example2" className="table table-bordered table-hover">
              <thead>
                <tr>
                <th>#</th>
                                              <th>URL</th>
                                              <th>Status</th>
                                              <th>Date</th>
                                              <th style={{display:this.state.disp}}>User</th>

                                              <th style={{display:this.state.disp}}>Delete</th>
                </tr>
              </thead>
              <tbody>
              {this.state.bla.map((val)=>{
                                                  return(
                                                      <tr>
                                                          <th scope="row">{val.id}</th>
                                                  <td>{val.linkname}</td>
                                                  <td>{val.status}</td>
                                                  <td>{val.date}</td>
                                                  <td style={{display:this.state.disp}}>{val.user}</td>
                                                  
                                                  <td style={{display:this.state.disp}}><button className="btn btn--radius-2 btn--blue" onClick={this.delete(val.id)}>Delete</button></td>
        
                                                      </tr>
                                                  )
                                              })}
              </tbody>
            </table>
          </div>
          {/* /.card-body */}
        </div>
        {/* /.card */}
     
        {/* /.card */}
      </div>
      {/* /.col */}
    </div>
    {/* /.row */}
  </section>
  {/* /.content */}
</div>

            </div>
        );
    }
}


export default Allquestion;