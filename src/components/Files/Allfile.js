import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import Axios from 'axios'
import fileDownload from 'js-file-download';
import DataTable,{defaultThemes} from 'react-data-table-component';
import show_noty from '../Noty/Notify';
class Allfile extends Component {
  state={
    bla:[],
    user:[],
    disp:false,
    
}
componentWillMount(){
   
  this.datafetcher()
}
datafetcher=()=>{
    let token=localStorage.getItem('Token')
    axios.get('https://greehorsebackend.herokuapp.com/getallfile',{
        headers:{
            
            'x-access-token':token

        }
    })
    
    .then(res =>{
        console.log(res.data)
        this.setState({bla:res.data.data})
        if (res.data.user==="admin"){
            this.setState({disp:true})
        }
    })
}

delete=(id)=>(e)=>{
    e.preventDefault()
    let token=localStorage.getItem('Token')
    axios.delete(`https://greehorsebackend.herokuapp.com/deletefile/${id}`,{
        headers:{
            'x-access-token':token
        }
    })
    .then(res =>{
      show_noty(res.data.status,res.data.noty)
        console.log(res.data)
        this.datafetcher()
    })
}
dowloadfile=(filename,user)=>(e)=>{
    e.preventDefault()
   
    const path=`${user}/${filename}`
    Axios.get(`https://greehorsebackend.herokuapp.com/download/${path}`,{
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

    const ExpanableComponent = ({ data }) => (
     
        <div className="card">
        <div className="card-header">
          <h5 className="m-0">File Name : {data.filename}</h5>
        </div>
        <div className="card-body">
    <h6 className="card-text">File Status : {data.status}</h6>
    <h6 className="card-text">Uploaded Date : {data.date}</h6>
    <h6 className="card-text">Question URL : {data.url}</h6>
    <h6 className="card-text">Total Word Count : {data.wordcount}</h6>
    <h6 className="card-text" style={this.state.disp ? {display:'block'} : {display:'none'}}>Uploaded By : {data.user}</h6>
        
        </div>
      </div>
    
    );

    // // const displaysort= ({ data })=>(
    // //     // console.log(data)
        

    // )
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
      
    const data=this.state.bla
    const pg=[5,10, 15, 20, 25, 30]
    const column=[
        {
            name:'Filename',
            selector:'filename',
            sortable:true
        },
        {
            name:'Status',
            selector:'status',
            sortable:'true',

        },
        {
            name:'Date',
            selector:'date',
            sortable:true
        },
        
        {   name:'',
            selector:obj=><button className="btn btn-block bg-gradient-primary" onClick={this.dowloadfile(obj.filename,obj.user)}><i className="fa fa-download"></i></button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '100px',
            padding:'12px'
        },
       

    ]
    if(this.state.disp){
      column.splice(3,0,{
        name:'User',
        selector:'user',
        sortable:true
    })
        column.push(
           
            {
            name:'',
            selector:(obj)=><Link to={`/editfile?page=${obj.id}`}><button className="btn btn-block btn-info">Edit</button></Link>,
            ignoreRowClick:true,
            allowOverflow:true,
            button:true,
            width: '100px',
            padding:'12px'
        },
        {   name:'',
            selector:(obj)=><button className="btn btn-block btn-danger" onClick={this.delete(obj.id)}>Delete</button>,
            ignoreRowClick:true,
            allowOverflow:true,
            button:true,
            width: '100px',
            padding:'12px'
        })
    }

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
                    title='File Upload'
                    data={data}
                    columns={column}
                    pagination
                    paginationRowsPerPageOptions={pg}
                    expandableRows
                    expandableRowsComponent={<ExpanableComponent />}
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

export default Allfile;