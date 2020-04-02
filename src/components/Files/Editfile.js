import React, { Component } from 'react';
import axios from 'axios'

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
            
            this.setState({alldata:res.data.data})
            const script=document.createElement("script")

            script.src='../../js/table.js'
            script.async=true;
    
            document.body.appendChild(script)
            if (res.data.user==="admin"){
                this.setState({disp:"",width:"150%"})
            }
        })
    }
    getdata=(id)=>(e)=>{
        e.preventDefault()
        let newid=id
        
        console.log(newid)
        let token= localStorage.getItem('Token')
        axios.get(`http://localhost:5000/getfile/${newid}`,{
            headers:{
                'Content-Type':'application/json',
                'x-access-token':token

            }
        })
        .then(res =>{
            console.log(res.data)
            let newres=res.data
            let keys=Object.keys(newres)
            let values=Object.values(newres)
            this.setState({bla:res.data})
            // for (const key of Object.keys[newres]){
            //     console.log(key)

            // }
            // for (const i in keys.length){
            //     console.log(keys[i])
            // }
            // for (let i = 0; i < keys.length; i++) {
            //    this.setState({[keys[i]]:values[i]})
            //     // console.log(values[i])
            // }

            //  console.log(keys[2])
            // this.setState({[res.data]:newres.address})
        })
    }
    userftecher=()=>{
        let token=localStorage.getItem('Token')
        axios.get('http://localhost:5000/getalluser',{
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
        axios.put(`http://localhost:5000/updatefile/${this.state.bla.id}`,this.state.bla,{
            headers:{
                'Content-Type':'application/json',
                'x-access-token':token
            }
            })
         .then(res =>{
             console.log(res.data.data)
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
    bhl=(e)=>{
        e.preventDefault()
        console.log('hi')
    }
    render() {
        return (
<div className="content-wrapper">
  {/* Content Header (Page header) */}
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>Project Edit</h1>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item active">Project Edit</li>
          </ol>
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
                <option selected={this.state.bla.status == 'none' ? true : false} value="none">On Hold</option>
                <option  selected={this.state.bla.status == 'accepted' ? true : false} value='accepted'>Accepted</option>
                <option selected  selected={this.state.bla.status == 'declined' ? true : false} value='declined'>Declined</option>
              </select>
              </div>
              </div>
              <div className="col-sm-6">
           
            <div className="form-group">
              <label htmlFor="inputStatus" >User</label>
              <select className="form-control custom-select"  onChange={this.valuechange}>
              {this.state.user.map((val)=>{
                                                  return(
                                                  <option  selected={this.state.bla.userid == val.id ? true : false} value={val.id}>{val.fullname}</option>
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
            <table  id="example2" className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Username</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {this.state.alldata.map((val)=>{
                                                  return(
                                                      <tr>
                                                       
                                                        <td>{val.filename}</td>
                                                        <td>{val.user}</td>
                                                        
                                                        <td style={{display:this.state.disp}}><button className="btn btn-block btn-info" onClick={this.getdata(val.id)}><i className="fas fa-eye" /></button></td>
                                                        <td style={{display:this.state.disp}}><button className="btn btn-block btn-danger" onClick={this.delete(val.id)}><i className="fas fa-trash" /></button></td>
                
                                                      </tr>
                                                  )
                                              })}
               
                  </tbody>
            </table>
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
const pd={
    float:'left'
}
export default Editfile;