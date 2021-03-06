import React, { Component } from 'react';
import {Formik,ErrorMessage} from 'formik'
import ValidationSchema from './Validation'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import show_noty from '../Noty/Notify';



class Login extends Component {
    state={
        email:"",
        password:"",
        redirect:false
    }
    render() {
        if(this.state.redirect){
            return(<Redirect exact path to={'/home'}/>)
        }
        else{
        return (
            <Formik initialValues={this.state} validationSchema={ValidationSchema} onSubmit={(values,err)=>{
                console.log(err)
                let username=values.email
                let password=values.password
                const auth=  btoa(username + ':' + password)
                axios.get('https://greehorsebackend.herokuapp.com/login',{
                    headers:{
                        'Authorization':`Basic ${auth}`,
                        "Content-Type": "application/json"
                    }

                })
            
                .then(res=>{
                  
                    if(res.data.status === 'success'){
                        localStorage.setItem('Token',res.data.token)
                        localStorage.setItem('Usertype',res.data.usertype)
                        localStorage.setItem('Dejavu',res.data.userid)
                        this.setState({redirect:true})
                       
                    }
                    else{
                        show_noty(res.data.status,res.data.noty)
                    }
                })

            }}>
                {({values,handleChange,handleBlur,handleSubmit})=>(

                    
                <div className="hold-transition login-page">
                <div className="login-box">
                    <div className="login-logo">
                    <b>Arkoray</b>Content
                    </div>
                    {/* /.login-logo */}
                    <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Sign in to start your session</p>
                        <form onSubmit={handleSubmit}>
                        <ErrorMessage style={err} name="email" component="div"/>
                        <div className="input-group mb-3">
                            <input type="email" className="form-control" placeholder="Email"  name="email" value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}/>
                            
                            <div className="input-group-append">
                            <div className="input-group-text">
                                <span className="fas fa-envelope" />
                            </div>
                            </div>
                        </div>
                        <ErrorMessage style={err} name="password" component="div"/>
                        <div className="input-group mb-3">
                            <input type="password" className="form-control" placeholder="Password" name="password" value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}/>
                         
                            <div className="input-group-append">
                            <div className="input-group-text">
                                <span className="fas fa-lock" />
                            </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-8">
                            <div className="icheck-primary">
                                <input type="checkbox" id="remember" />
                                <label htmlFor="remember">
                                Remember Me
                                </label>
                            </div>
                            </div>
                            {/* /.col */}
                            <div className="col-4">
                            <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                            </div>
                            {/* /.col */}
                        </div>
                        </form>

                        {/* /.social-auth-links */}
                       
                        <p className="mb-0">
                        <a href="/" className="text-center">Register a new membership</a><br/>
                        <a href="/reset" className="text-center">Forgot password</a>
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

export default Login;