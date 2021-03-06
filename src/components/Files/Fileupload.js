import React, { Component } from 'react';
import axios from 'axios'
import Percent from './Percent'
import show_noty from '../Noty/Notify';
import token_genrator from '../Miscallenous/Token';

class Fileupload extends Component {
  state={
    file:"",
    url:"",
    filename:"Please upload file",
    wordcount:"",
    filedisplay:"",
    diplsy:true,
    percent:0
    
}
uploadstaus=(e)=>{
  if (e.target.files !== ""){
    this.setState({[e.target.name]:e.target.files,filedisplay:e.target.files[0].name,diplsy:true})
    
  }
   
}
uploadurl=(e)=>{
    this.setState({url:e.target.value})
    
}
uploadfile= async (e)=>{
    e.preventDefault();
    
    
    const formdata = new FormData()
    for(const key of Object.keys(this.state.file)){
        formdata.append("file",this.state.file[key])
        formdata.append("status","none")
        formdata.append("url",this.state.url)
        
    }

 
    try{
        await axios.post('https://greehorsebackend.herokuapp.com/upload',formdata,{
            headers:{
                'Content-Type':'multipart/form-data',
                'x-access-token':token_genrator()
            },
            onUploadProgress: ProgressEvent =>{
              this.setState({percent:(parseInt(Math.round((ProgressEvent.loaded * 100)/ProgressEvent.total)))})
            }
            
        })
        .then( res =>{
            show_noty(res.data.status,res.data.noty)
         
            let newwordcount=`Total: ${res.data.wordcount} Word Count`
            if (res.data.wordcount!== undefined){
             
              this.setState({diplsy:false})
              this.setState({wordcount:newwordcount})
              setTimeout(()=>{this.setState({percent:0})},2000)
            }
            else{
              setTimeout(()=>{this.setState({percent:0})},500)
            }
             
            this.setState({url:'',file:'',filedisplay:''})
        })
       
      
    }
    catch(err){
        console.log(err)
    }

  
}
    render() {
        return (
                       <div>
       <div className="content-wrapper">
  {/* Content Header (Page header) */}
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">

      </div>
    </div>{/* /.container-fluid */}
  </section>
  {/* Main content */}
  <section className="content">
    <div className="container-fluid">
      <div className="row">
        {/* left column */}
        <div style={ml} className="col-md-6">
          {/* general form elements */}
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">File Upload</h3>
            </div>
            {/* /.card-header */}
            {/* form start */}
            <form onSubmit={this.uploadfile}>
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">URL / Link</label>
                  <input type="text" className="form-control"  placeholder="Enter URL" value={this.state.url} name="url" id="url" onChange={this.uploadurl}/>
                </div>
                
                <div className="form-group">
                  <label htmlFor="exampleInputFile">File input</label>
                  <div className="input-group">
                    <div className="custom-file">
                      <input type="file" className="custom-file-input" name="file"  id="try" onChange={this.uploadstaus} />
                      <label className="custom-file-label" htmlFor="exampleInputFile">{this.state.filedisplay.length < 1 ? "Enter file here" :(this.state.filedisplay)}</label>
                    </div>
                    
                    
                  </div>
                </div>
          <div  style={this.state.diplsy ?  {display:'block'} :{display:'none'} }>
            <Percent percent={this.state.percent}/>
          </div>
               
              </div>
              <h1 style={this.state.diplsy ? {display:'none'} :  {display:'block',color:'green'}}>{this.state.wordcount}</h1>
              {/* /.card-body */}
              <div className="card-footer">
              <button className="btn btn-info" disabled={this.state.url.length <1 ? true : false}  type="submit">Upload</button>
              </div>
            </form>
          </div>
          {/* /.card */}
          {/* Form Element sizes */}
         
           </div>
        </div>
        </div>
  
  </section>
  {/* /.content */}
</div>

            </div>
        );
    }
}

const ml={
  marginLeft:'20%'
}
export default Fileupload;