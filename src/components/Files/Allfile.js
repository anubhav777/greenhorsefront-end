import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import Axios from 'axios'
import fileDownload from 'js-file-download';
class Allfile extends Component {
    state={
        bla:[],
        user:[],
        disp:"none",
        
    }
    componentWillMount(){
       
      this.datafetcher()
    }
    datafetcher=()=>{
        let token=localStorage.getItem('Token')
        axios.get('http://localhost:5000/getallfile/overall',{
            headers:{
                
                'x-access-token':token

            }
        })
        
        .then(res =>{
            console.log(res.data)
            const script=document.createElement("script")

            script.src='../../js/table.js'
            script.async=true;
    
            document.body.appendChild(script)
            this.setState({bla:res.data.data})
            if (res.data.user==="admin"){
                this.setState({disp:"",width:"150%"})
            }
        })
    }
    
    delete=(id)=>(e)=>{
        e.preventDefault()
        let token=localStorage.getItem('Token')
        axios.delete(`http://localhost:5000/deletefile/${id}`,{
            headers:{
                'x-access-token':token
            }
        })
        .then(res =>{
            console.log(res.data)
            this.datafetcher()
        })
    }
    dowloadfile=(filename,user)=>(e)=>{
        e.preventDefault()
       
        const path=`${user}/${filename}`
        Axios.get(`http://localhost:5000/download/${path}`,{
            headers:{
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Expose-Headers': '*'
            },
            responseType:'blob'
        })
        .then(response  =>{
            // console.log(response.request.getResponseHeader('Content-Disposition')[filename])
            let new_header=response.request.getResponseHeader('Content-Disposition')
            let new_split=new_header.split(";",2)
            let file_split=new_split[1].split("=",2)
            let filename=file_split[1]
            let filename_split=filename.split("/",2)
            let new_filename=filename_split[1]
            console.log(new_filename)
            fileDownload(response.data,new_filename)
        })
        
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
                                              <th></th>
                                              <th>Filename</th>
                                              
                                             <th>Download</th>
                                              <th>URL</th>
                                              <th>Wordcount</th>
                                              <th>Status</th>
                                              <th>Date</th>
                                              <th style={{display:this.state.disp}}>User</th>
                                              <th style={{display:this.state.disp}}>Edit</th>
                                              <th style={{display:this.state.disp}}>Delete</th>
                </tr>
              </thead>
              <tbody>
              {this.state.bla.map((val,i)=>{
                                                  return(
                                                      <tr>
                                                        <th scope="row">{i+1}</th>
                                                        <td><img style={img_wdth} src={process.env.PUBLIC_URL+"/word.jpg"}/></td>
                                                        <td>{val.filename}</td>
                                                        <td><button style={btn} onClick={this.dowloadfile(val.filename,val.user)}><i className="fa fa-download"></i></button></td>
                                                        <td>{val.url}</td>
                                                        <td>{val.wordcount}</td>
                                                        <td>{val.status}</td>
                                                        <td>{val.date}</td>
                                                        <td style={{display:this.state.disp}}>{val.user}</td>
                                                        <td style={{display:this.state.disp}}><Link to={`/updatefile?page=${val.id}`}><button className="btn btn-block btn-info">Edit</button></Link></td>
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

            </div>
        );
    }
}
const btn={
    backgroundColor: "DodgerBlue",
    border: "none",
    color: 'white',
    padding: '12px 30px',
    cursor: 'pointer',
    fontSize: '20px'
}
const img_wdth={
    height:'32px',
    width:'32px'
}
export default Allfile;