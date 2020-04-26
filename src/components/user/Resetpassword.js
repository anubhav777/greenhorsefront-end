import React, { Component } from 'react';
import {Formik,ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import show_noty from '../Noty/Notify'
class Resetpassword extends Component {
    state={
        email:''
    }
    render() {
        return (
            <Formik initialValues={this.state} validationSchema={Yup.object().shape({
                email:Yup.string()
                .email("please provide valid email")
                .required("please enter your email")
            })} onSubmit={(values,{resetForm})=>{
                console.log(values)
                show_noty('alert','Please wait a moment while your gmail is being verified')
                let email=values.email
                let new_email=JSON.stringify({
                    'email':email
                })
                axios.post('https://greehorsebackend.herokuapp.com/resetpassword',new_email,{
                    headers:{
                        'Content-Type':'application/json'
                    }
                })
                .then(res=>{
                  show_noty(res.data.status,res.data.noty)
                    console.log(res.data)
                })
                resetForm({})
            }}>
                 {({values,errors,handleChange,handleBlur,handleSubmit})=>(
<div className="hold-transition login-page">
<div className="login-box">
  <div className="login-logo">
    <a href="../../index2.html"><b>Green</b>Horse</a>
  </div>
  {/* /.login-logo */}
  <div className="card">
    <div className="card-body login-card-body">
      <p className="login-box-msg">You forgot your password? Here you can easily retrieve a new password.</p>
      <form onSubmit={handleSubmit}>
      <ErrorMessage component="div" name="email" style={err}/>
        <div className="input-group mb-3">
          <input className="form-control" placeholder="Email" type="email" name="email" id="email" value={values.email || ''}
                                      onChange={handleChange}
                                      onBlur={handleBlur}/>
                                      

          <div className="input-group-append">
            <div className="input-group-text">
           
              <span className="fas fa-envelope" />
            </div>
          </div>
        </div>
       
        <div className="row">
          <div className="col-12">
            <button type="submit" className="btn btn-primary btn-block">Request new password</button>
          </div>
          {/* /.col */}
        </div>
      </form>
      <p className="mt-3 mb-1">
        <a href="/login">Login</a>
      </p>
      <p className="mb-0">
        <a href="/" className="text-center">Register a new membership</a>
      </p>
    </div>
    {/* /.login-card-body */}
  </div>
</div>

</div>
                 )}
</Formik>
        );
    }
}
const err={
    color:"red"
}
export default Resetpassword;