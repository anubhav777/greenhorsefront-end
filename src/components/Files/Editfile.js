import React, { Component } from 'react';
import axios from 'axios';
import DataTable,{defaultThemes} from 'react-data-table-component';
import styled from 'styled-components'
import show_noty from '../Noty/Notify';
class Editfile extends Component {
    state={
        bla:[],
        redirect:false,
        user:[],
        alldata:[]
    }
    componentWillMount(){
        
        this.userftecher()
        this.datafetcher()
       
        if(window.location.href.indexOf("page=") !== -1){
          let url=window.location.href
          let newsplit=url.split('=',2)
          let newid=Number(newsplit[1])
          console.log('hi')
         this.generatedata(newid)
        }
        else{
          console.log('bye')
        }
       

       
    }
    componentDidMount(){
      
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
            
            this.setState({alldata:res.data.data})
          
          
            if (res.data.user === "admin"){
                this.setState({disp:"",width:"150%"})
            }
        })
    }
    getdata=(id)=>(e)=>{
     e.preventDefault()
      this.generatedata(id)
    }
    generatedata=(id)=>{
      let token= localStorage.getItem('Token')
      axios.get(`https://greehorsebackend.herokuapp.com/getfile/${id}`,{
          headers:{
              'Content-Type':'application/json',
              'x-access-token':token

          }
      })
      .then(res =>{
        this.setState({bla:res.data})
      })
    }
    userftecher=()=>{
        let token=localStorage.getItem('Token')
        axios.get('https://greehorsebackend.herokuapp.com/getalluser',{
            headers:{
                
                'x-access-token':token

            }
        })
        
        .then(res =>{
            console.log(res.data)
            
            this.setState({user:res.data.data})
        })
    }
    updatedata=(e)=>{
        e.preventDefault()
        let token= localStorage.getItem('Token')
        // const values={
        //     "email":this.state.email,
        //     "address":this.state.address,
        //     "fullname":this.state.fullname,
        //     "phone":this.state.phone,
        //     "usertype":this.state.usertype
        // }
        const newbla=JSON.stringify(this.state.bla)
        console.log(newbla)
        axios.put(`https://greehorsebackend.herokuapp.com/updatefile/${this.state.bla.id}`,this.state.bla,{
            headers:{
                'Content-Type':'application/json',
                'x-access-token':token
            }
            })
         .then(res =>{
           show_noty(res.data.status,res.data.noty)
           
             if(res.data.data === "updated sucessfully"){
                 this.setState({redirect:true})
             }
            
         })
          .catch(error => {
            
            console.log(error)
          })
          

    }
    valuechange=(e)=>{
        let item = Object.assign({}, this.state.bla, {[e.target.name]: e.target.value});
        let bla = item;
        console.log(item)
        this.setState({bla: bla});       
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
    bhl=(e)=>{
        e.preventDefault()
        console.log('hi')
    }
    render() {
      const pg=10
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
      
      const data=this.state.alldata
      const column=[
        {
          name:'File Name',
          selector:'filename',
          sort:true
        },
        {
          name:'User Name',
          selector:'user',
          sort:true
        },
        {
          selector:(obj)=><button className="btn btn-block btn-info" onClick={this.getdata(obj.id)}><i className="fas fa-eye" /></button>,
          ignoreRowClick:true,
          allowOverflow:true,
          button:true,
          width: '100px',
          padding:'12px'
        },
        {
        selector:(obj)=><button className="btn btn-block btn-danger" onClick={this.delete(obj.id)}><i className="fas fa-trash" /></button>,
        ignoreRowClick:true,
        allowOverflow:true,
        button:true,
        width: '100px',
        padding:'12px'
        }

      ]
        return (
<div className="content-wrapper">
  {/* Content Header (Page header) */}
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>Project Edit</h1>
        </div>
              </div>
    </div>{/* /.container-fluid */}
  </section>
  {/* Main content */}
  <section className="content">
    <div className="row">
      <div className="col-md-6">
        <div className="card card-primary">
          <div className="card-header">
            <h3 className="card-title">General</h3>
            <div className="card-tools">
              <button type="button" className="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                <i className="fas fa-minus" /></button>
            </div>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="inputName">Filename</label>
              <input type="text" className="form-control" name="filename" id="filename" value={this.state.bla.filename}
                                      onChange={this.valuechange}
                                     />
            </div>
            <div className="form-group">
              <label htmlFor="inputName">URL</label>
              <input type="text"  className="form-control"name="url" id="url" value={this.state.bla.url}
                                      onChange={this.valuechange}/>
            </div>
            <div className="form-group">
              <label htmlFor="inputName">Wordcount</label>
              <input type="number" className="form-control"  id="wordcount" value={this.state.bla.wordcount}
                                      onChange={this.valuechange}/>
            </div>
            <div className="col-sm-6">
            <div className="form-group">
                
              <label htmlFor="inputStatus">Status</label>
              <select className="form-control custom-select" name="status" onChange={this.valuechange}>
                {/* <option selected disabled>Select one</option> */}
                <option>None</option>
                <option selected={this.state.bla.status === 'none' ? true : false} value="none">On Hold</option>
                <option  selected={this.state.bla.status === 'accepted' ? true : false} value='accepted'>Accepted</option>
                <option selected  selected={this.state.bla.status === 'declined' ? true : false} value='declined'>Declined</option>
              </select>
              </div>
              </div>
              <div className="col-sm-6">
           
            <div className="form-group">
              <label htmlFor="inputStatus" >User</label>
              <select className="form-control custom-select"  onChange={this.valuechange}>
              {this.state.user.map((val,i)=>{
                                                  return(
                                                    
                                                  <option key={i}  selected={this.state.bla.userid === val.id ? true : false} value={val.id}>{val.fullname}</option>
                                                  )
                                              })}
               
              </select>
            </div>
            </div>
          </div>
          <div class="card-footer">
                  <button onClick={this.updatedata} class="btn btn-primary float-right">Update</button>
                  
                </div>
          {/* /.card-body */}
        </div>
        {/* /.card */}
      </div>
      <div className="col-md-6">
       
        {/* /.card */}
        <div className="card card-info">
          <div className="card-header">
            <h3 className="card-title">Files</h3>
            <div className="card-tools">
              <button type="button" className="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                <i className="fas fa-minus" /></button>
            </div>
          </div>
          <div className="card-body p-1">
            
             <DataTable
             className="table table-bordered table-hover"
             data={data}
             columns={column}
             pagination
             noHeader
             paginationPerPage={pg}
             customStyles={customStyles}
             />
          
          </div>
          {/* /.card-body */}
        </div>
        {/* /.card */}
      </div>
    </div>
    
  </section>
  {/* /.content */}
</div>

        );
    }
}

export default Editfile;