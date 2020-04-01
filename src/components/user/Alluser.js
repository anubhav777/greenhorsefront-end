import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
class Alluser extends Component {
    state={
        bla:[],
        disp:'none'
    }
    componentWillMount(){
        // fetch('http://localhost:5000/tryuser')
      this.datafetcher()
    }
    datafetcher=()=>{
        let token=localStorage.getItem('Token')
        axios.get('http://localhost:5000/getalluser',{
            headers:{
                'x-access-token':token
            }
        })
        
        .then(res =>{
            console.log(res.data)
            
            this.setState({bla:res.data.data})
            this.setState({bla:res.data.data})
            const script=document.createElement("script")

        script.src='../../js/table.js'
        script.async=true;

        document.body.appendChild(script)
            if (res.data.user==="admin"){
                this.setState({disp:""})
            }
        })
    }
    delete=(id)=>(e)=>{
        e.preventDefault()
        let token=localStorage.getItem('Token')
        axios.delete(`http://localhost:5000/deleteuser/${id}`,{
            headers:{
                'x-access-token':token
            }
        })
        .then(res =>{
            console.log(res.data)
            this.datafetcher()
        })
    }
    render() {
        return (
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
                                      <th>Full Name</th>
                                      <th>Email</th>
                                      <th>Phone</th>
                                      <th>Address</th>
                                      <th>Usertype</th>
                                      <th style={{display:this.state.disp}}>Edit</th>
                                      <th style={{display:this.state.disp}}>Delete</th>
                </tr>
              </thead>
              <tbody>
              {this.state.bla.map((val)=>{
                                          return(
                                              <tr>
                                                  <th scope="row">{val.id}</th>
                                          <td>{val.fullname}</td>
                                          <td>{val.email}</td>
                                          <td>{val.phone}</td>
                                          <td>{val.address}</td>
                                          <td>{val.usertype}</td>
                                          <td style={{display:this.state.disp}}> <Link to={`/edituser?page=${val.id}`} ><button className="btn btn-block btn-info">Edit</button></Link></td>
                                          <td style={{display:this.state.disp}}><button className="btn btn-block btn-danger" onClick={this.delete(val.id)}>Delete</button></td>

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


        );
    }
}

export default Alluser;