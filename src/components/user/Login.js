import React, { Component } from 'react';
import {Formik,ErrorMessage} from 'formik'
import ValidationSchema from './Validation'
import {Redirect} from 'react-router-dom'
import base64 from 'base-64'
import axios from 'axios'



class Login extends Component {
    state={
        email:"",
        password:"",
        redirect:false
    }
    converbase=(url)=>{
        const reader= new FileReader()
        reader.readAsDataURL(url)
        reader.onloadend = function(){
            let base64data=reader.result
            let new_split=base64data.split(",",2)
            // let tryop=base64data.replace(/^data:image\/(png|jpeg);base64,/, "")
            // console.log(tryop,new_split[1])
            let new_image=new_split[1]
            localStorage.setItem("Profile",new_image)
            

        }
        setTimeout(()=>{this.setState({redirect:true})},50)
    }
    render() {
        if(this.state.redirect){
            return(<Redirect to={'/try'}/>)
        }
        else{
        return (
            <Formik initialValues={this.state} validationSchema={ValidationSchema} onSubmit={(values,err)=>{
                console.log(err)
                let username=values.email
                let password=values.password
                const auth=  btoa(username + ':' + password)
                axios.get('http://localhost:5000/login',{
                    headers:{
                        'Authorization':`Basic ${auth}`,
                        "Content-Type": "application/json"
                    }

                })
            
                .then(res=>{
                    console.log(res.data)
                    console.log(res.data.filepath)
                    if(res.data.status === 'sucess'){
                        const path=res.data.filepath
                        axios.get(`http://localhost:5000/download/${path}`,{
                            headers:{
                                'Access-Control-Allow-Origin':'*',
                                'Access-Control-Expose-Headers': '*'
                            },
                            responseType:'blob'
                        })
                        .then(response  =>{

                            this.converbase(response.data)
                        })
                        
                        localStorage.setItem('Token',res.data.token)
                        localStorage.setItem('Usertype',res.data.usertype)
                        localStorage.setItem('Dejavu',res.data.userid)
                       
                    }
                    
                })

            }}>
                {({values,handleChange,handleBlur,handleSubmit})=>(

                    
                <div className="hold-transition login-page">
                <div className="login-box">
                    <div className="login-logo">
                    <b>Green</b>Horse
                    </div>
                    {/* /.login-logo */}
                    <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Sign in to start your session</p>
                        <form onSubmit={handleSubmit}>
                        <div className="input-group mb-3">
                            <input type="email" className="form-control" placeholder="Email"  name="email" value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}/>
                             <ErrorMessage style={err} name="email" component="div"/>
                            <div className="input-group-append">
                            <div className="input-group-text">
                                <span className="fas fa-envelope" />
                            </div>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <input type="password" className="form-control" placeholder="Password" name="password" value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}/>
                            <ErrorMessage style={err} name="password" component="div"/>
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
                        <a href="?" className="text-center">Register a new membership</a>
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