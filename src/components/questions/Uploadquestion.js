import React, { Component } from 'react';
import {Formik,ErrorMessage} from 'formik';
import * as Yup from 'yup'
import show_noty from '../Noty/Notify'
import token_genrator from '../Miscallenous/Token';

class Uploadquestion extends Component {
  state={
    linkname:"",
    status:"Approved",
    process:"Check",
    verifier:true,
    display:true,
    show:false,

}
reset=(e)=>{
    // e.preventDefault()
   
  
    this.setState({show:false,linkname:"",display:true,verifier:true,process:"Check"})
    document.getElementById('form_ik').reset()
    
}
    render() {
        return (
          <Formik initialValues={this.state} validationSchema={Yup.object().shape({
            linkname:Yup.string()
            .min(5,"Please enter valid link since it does not satisfy the length")
            .max(150,"link seems to be too long")
            .required("Please enter link")
        })} onSubmit={(values,{resetForm})=>{
     
          
            let token= token_genrator()
            if(this.state.verifier === true){
            
           fetch('https://greehorsebackend.herokuapp.com/addlink',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'x-access-token':token
                },
                body:JSON.stringify(values)
                
            })
            .then(re => re.json())
            .then(res =>{
                this.setState({linkname:values.linkname})
                
                this.setState({show:true})

                if(res.status === 'alert'){
                  // alert(res.upload)
                  show_noty(res.status,res.noty)
                 
                 
                }
                else{
                   values.verifier=false
                   this.setState({display:false,verifier:false})
                }
                
            })
        }
        else{
           
            values.process="Add"
            setTimeout(()=>{fetch('https://greehorsebackend.herokuapp.com/addlink',{
               method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'x-access-token':token
                },
                body:JSON.stringify(values)

           })
           .then(re => re.json())
           .then(res => {
               
               values.process='Check'
            //  document.getElementById('form_ik').reset()
            show_noty(res.status,res.noty)
            this.reset()
           })
          
                       
         
        
       },500) 
           
        }
   
       
        }}>
            {({values,handleChange,handleBlur,handleSubmit})=>(
            <div>
       <div className="content-wrapper">
  {/* Content Header (Page header) */}
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1  style={ml}>Question Validator</h1>
        </div>
        
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
              <h3 className="card-title">Question Upload</h3>
            </div>
            {/* /.card-header */}
            {/* form start */}
            <form onSubmit={handleSubmit} id="form_ik">
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Question URL</label>
                  <input type="text" className="form-control"  name="linkname"
                                                 value={values.name}
                                                 onChange={handleChange}
                                                 onBlur={handleBlur}/>
                                                 <ErrorMessage style={err} component="div" name="linkname"/>
                </div>

              </div>
              <div style={this.state.show ?{display:"inline"} : {display:"none"} }>
                                     <h3 style={this.state.display ?{color:"red"} : {color:"green",border:'.2px solid green',padding:'10px'} }>{this.state.linkname}</h3>
                                     </div>
              {/* /.card-body */}
              <div className="card-footer">
                <button type="submit" name="check" className="btn btn-primary" style={this.state.display ?{display:"inline"} : {display:"none"} }>Check</button>
                <button className="btn btn-info" name="accept"  type="submit" style={this.state.display ?{display:"none"} : {display:"inline", color:'white', background:'green'} }>Accept</button>
                <button type="reset" onClick={this.reset} className="btn btn-danger" style={this.state.display ?{display:"none"} : {display:"inline", marginLeft:"10px", color:'white', background:'red'} }>Reject</button>
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
                )}
                </Formik>
            );
        }
    }
const ml={
    marginLeft:'20%'
}
const err={
  color:"red"
}
export default Uploadquestion;