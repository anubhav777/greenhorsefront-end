import React, { Component } from 'react';
import {Formik,ErrorMessage} from 'formik'
import {Redirect} from 'react-router-dom'
import * as Yup from 'yup'
import axios from 'axios'
class signup extends Component {
    state={
        address:"",
        fullname:"",
        email:"",
        password:"",
        phone:"",
        usertype:"staff",
        redirect:false,
        disable:true
       

    }
    disable_func=(e)=>{
        this.setState({disable:!this.state.disable})
    }
    render() {
      if(this.state.redirect){
        return(
            <Redirect to={'/login'}/>
        )
      }
      else{
        return (
           <Formik initialValues={this.state} validationSchema={Yup.object().shape({
            email:Yup.string()
            .email("please provide valid email")
            .required("please enter your email"),
        
            password:Yup.string()
            .required("please enter a password")
            .matches(/^(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,20}/,
            "Must Contain 8 Characters,should start with alphabet and contain One Number and One special case Character"),

            address:Yup.string()
            .min(2,'Adress is too short')
            .max(15,'adress is too long')
            .required('address is required'),

            fullname:Yup.string()
            .min(2,'Name is too short')
            .max(15,'Name is too long')
            .required('Full Name is required'),


            phone:Yup.string()
            .min(8,'please enter valid number')
            .max(10,'Please only number')
            .required('Phone number required')



        
           })} onSubmit={(values)=>{
            console.log(values)
          console.log(JSON.stringify(values))
          fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: {
              
              // 'Accept': 'application/json, text/plain, */*',
              "Content-Type": "application/json",
              
                        },
            body:JSON.stringify(values),
            
            
          })
          .then(data => {
            if (data.status === 200){
              console.log('hi')
              this.setState({redirect:true})
              let new_email=JSON.stringify({
                'email':values.email
              })
              axios.post('http://localhost:5000/verification',new_email,{
                headers: {
              
                  // 'Accept': 'application/json, text/plain, */*',
                  "Content-Type": "application/json",
                  
                            }
              })
              .then(res =>{
                console.log(res.data)
              })
            }

          
          })
          .catch(error => {
            
            console.log(error)
          })
          
        
        
        
               

           }}>
               {({values,errors,handleChange,handleBlur,handleSubmit})=>(
                   <div className="hold-transition register-page">
<div className="register-box">
  <div className="register-logo">
    <a href="../../index2.html"><b>Green</b>Horse</a>
  </div>
  <div className="card">
    <div className="card-body register-card-body">
      <p className="login-box-msg">Register a new membership</p>
      <form  onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input className="form-control" placeholder="Full name" type="text" name="fullname" id="fullname" value={values.name}
                                      onChange={handleChange}
                                      onBlur={handleBlur} />
           
          <div className="input-group-append">
            <div className="input-group-text">
            <ErrorMessage style={err} name="fullname" component="div"/>
              <span className="fas fa-user" />
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input  className="form-control" placeholder="Email" type="email" name="email" id="email" value={values.name}
                                      onChange={handleChange}
                                      onBlur={handleBlur}/>
                                      
          <div className="input-group-append">
            <div className="input-group-text">
            <ErrorMessage style={err} name="email" component="div"/>
              <span className="fas fa-envelope" />
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input  className="form-control" placeholder="Adress"type="text" name="address" id="address" value={values.name}
                                      onChange={handleChange}
                                      onBlur={handleBlur}/>
          <div className="input-group-append">
            <div className="input-group-text">
            <ErrorMessage style={err} name="address" component="div"/>
              <span className="fas fa-envelope" />
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input className="form-control" placeholder="Phone" type="text" name="phone" id="phone" value={values.name}
                                      onChange={handleChange}
                                      onBlur={handleBlur}/>
          <div className="input-group-append">
            <div className="input-group-text">
            <ErrorMessage style={err} name="phone" component="div"/>
              <span className="fas fa-lock" />
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input type="password" className="form-control" placeholder="Password"name="password" id="password" value={values.name}
                                      onChange={handleChange}
                                      onBlur={handleBlur}/>
                                     
          <div className="input-group-append">
         
            <div className="input-group-text">
            <ErrorMessage style={err} name="password" component="div"/>
              <span className="fas fa-lock" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <div className="icheck-primary">
              <input type="checkbox" id="agreeTerms" name="terms" defaultValue="agree" onChange={this.disable_func}/>
              <label htmlFor="agreeTerms">
                I agree to the terms
              </label>
            </div>
          </div>
          {/* /.col */}
          <div className="col-4">
            <button type="submit" disabled={this.state.disable ? true : false} className="btn btn-primary btn-block">Register</button>
          </div>
          {/* /.col */}
        </div>
      </form>
     
      <a href="/login" className="text-center">I already have a membership</a>
    </div>
    {/* /.form-box */}
  </div>{/* /.card */}
</div>
</div>

               )}



           </Formik>
        );
               }
    }
}


const err={
    color:"red"
}
export default signup;