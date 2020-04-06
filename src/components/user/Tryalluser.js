import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import DataTable,{defaultThemes} from 'react-data-table-component';
class Tryalluser extends Component {
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
        const customStyles = {
            header: {
                style: {
                  minHeight: '56px',
                },
              },
              headRow: {
                style: {
                  borderTopStyle: 'solid',
                  borderTopWidth: '1px',
                  borderTopColor: defaultThemes.default.divider.default,
                },
              },
              headCells: {
                style: {
                  '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                    borderRightColor: defaultThemes.default.divider.default,
                    fontSize:'16px',
                    fontFamilySansSerif11: 'Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbo',
                  
                  },
                },
              },
              cells: {
                style: {
                  '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                    borderRightColor: defaultThemes.default.divider.default,
                    fontSize:'16px',
                    fontFamilySansSerif11: 'Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbo',
                  
                    
                  },
                },
              },
            };
            const data = this.state.bla
            const column=[
                {
                    name:'Full Name',
                    selector:'fullname',
                    sortable:true
                },
                {
                    name:'Email',
                    selector:'email',
                    sortable:true
                },
                {
                    name:'Phone Number',
                    selector:'phone',
                    sortable:true
                },
                {
                    name:'Address',
                    selector:'address',
                    sortable:true
                },
                {
                    name:'User-Type',
                    selector:'usertype',
                    sortable:true
                },
            {   name:'',
                selector:obj=><Link to={`/edituser?page=${obj.id}`} ><button className="btn btn-block btn-info">Edit</button></Link>,
                ignoreRowClick: true,
                allowOverflow: true,
                button: true,
                width: '100px',
                padding:'12px'
            },
            {   name:'',
                selector:obj=><button className="btn btn-block btn-danger" onClick={this.delete(obj.id)}>Delete</button>,
                ignoreRowClick: true,
                allowOverflow: true,
                button: true,
                width: '100px',
                padding:'12px'
        },
            ]
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
                      
                        
                      <DataTable
                        title='Users'
                        data={data}
                        columns={column}
                        pagination
                       
                        customStyles={customStyles}
                        
                        
                        />
             
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

export default Tryalluser;