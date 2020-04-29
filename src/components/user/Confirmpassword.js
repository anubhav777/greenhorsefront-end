import React, { Component } from 'react';
import {Formik,ErrorMessage, validateYupSchema} from 'formik'
import * as Yup from 'yup'
import Axios from 'axios';
import show_noty from '../Noty/Notify';
import {Redirect} from 'react-router-dom'
class Confirmpassword extends Component {
    state={
        password:'',
        confirmpassword:'',
        redirect:false
    }
    render() {
      if(this.state.redirect){
        return(<Redirect to={'/login'}/>)
    }
    else{
        return (
            <Formik initialValues={this.state} validationSchema={Yup.object().shape({
                password:Yup.string()
                .required("please enter a password")
                .matches(/^(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,20}/,
                "Must Contain 8 Characters,should start with alphabet and contain One Number and One special case Character"),
                confirmpassword:Yup.string()
                .required("please enter a password")
                .matches(/^(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,20}/,
                "Must Contain 8 Characters,should start with alphabet and contain One Number and One special case Character"),
            })} onSubmit={(values)=>{
                console.log(values)
                let url=window.location.href
                let newsplit=url.split("=",2)
                let token=newsplit[1]
                console.log(token)
                const new_data=JSON.stringify({
                    password:values.password,
                    confirmpassword:values.confirmpassword
                })
                Axios.post(`http://greenhorsebackend.eba-6m8y2epd.us-west-2.elasticbeanstalk.com/confirmpassword/${token}`,new_data,{
                    headers:{
                        'Content-Type':'application/json'
                    }
                })
                .then(res=>{
                  show_noty(res.data.status,res.data.noty)
                    console.log(res.data)
                    if(res.data.status === 'alert'){
                      setTimeout(()=>{this.setState({redirect:true})},500)
                    }
                })


            }}>
                {({values,errors,handleChange,handleBlur,handleSubmit})=>(
            <div className='hold-transition login-page'>
<div className="login-box">
  <div className="login-logo">
   <b>Arkoray</b>Content
  </div>
  {/* /.login-logo */}
  <div className="card">
    <div className="card-body login-card-body">
      <p className="login-box-msg">You are only one step a way from your new password, recover your password now.</p>
      <form onSubmit={handleSubmit}>
      <ErrorMessage  component="div" name="password" style={err}/>
        <div className="input-group mb-3">
          <input type="password" className="form-control" placeholder="Password" name="password" id="password" value={values.password || ''}
                                      onChange={handleChange}
                                      onBlur={handleBlur}/>
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock" />
            </div>
          </div>
        </div>
        <ErrorMessage component='div' name='confirmpassword' style={err}/>
        <div className="input-group mb-3">
          <input type="password" className="form-control" placeholder="Confirm Password" name="confirmpassword" id="confirmpassword" value={values.confirmpassword || ''}
                                      onChange={handleChange}
                                      onBlur={handleBlur}/>
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <button type="submit" className="btn btn-primary btn-block">Change password</button>
          </div>
          {/* /.col */}
        </div>
      </form>
      <p className="mt-3 mb-1">
        <a href="login.html">Login</a>
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
}
const err={
    color:"red"
}
export default Confirmpassword;