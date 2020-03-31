import React, { Component } from 'react';
import {Formik,ErrorMessage} from 'formik'
import ValidationSchema from './Validation'
import {Redirect} from 'react-router-dom'
import base64 from 'base-64'



class Login extends Component {
    state={
        email:"",
        password:"",
        redirect:false
    }
    render() {
        if(this.state.redirect){
            return(<Redirect to={'/file'}/>)
        }
        else{
        return (
            <Formik initialValues={this.state} validationSchema={ValidationSchema} onSubmit={(values,err)=>{
                console.log(err)
                let username=values.email
                let password=values.password
                const auth=  btoa(username + ':' + password)
                fetch('http://localhost:5000/login',{
                    headers:{
                        'Authorization':`Basic ${auth}`,
                        "Content-Type": "application/json"
                    }

                })
                .then(re=>re.json())
                .then(res=>{
                    console.log(res)
                    
                    if(res.status === 'sucess'){
                        localStorage.setItem('Token',res.token)
                        localStorage.setItem('Usertype',res.usertype)
                        this.setState({redirect:true})
                    }
                    
                })

            }}>
                {({values,handleChange,handleBlur,handleSubmit})=>(

                    
        <div className="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
        <div className="wrapper wrapper--w780">
            <div className="card card-4">
                <div className="card-body">
                    <h2 className="title">Registration Form</h2>
                    <form onSubmit={handleSubmit}>
                 
                          <div className="input-group">
                             <div className="col-2">
                                <div className="input-group">
                                      <label className="label">Email</label>
                                    <input className="input--style-4" style={wdth} type="text" name="email" value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}/>
                             <ErrorMessage style={err} name="email" component="div"/>
                                </div>
                            </div>
                        </div>
                       
                      <div className="input-group">
                             <div className="col-2">
                                <div className="input-group">
                                    <label className="label">Password</label>
                                    <input style={wdth} className="input--style-4" type="password" name="password" value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}/>
                            <ErrorMessage style={err} name="password" component="div"/>
                                </div>
                            </div>
                        </div>
                        <div className="p-t-15">
                            <button className="btn btn--radius-2 btn--blue" type="submit" >Login</button>
                    </div>
                    </form>
                </div>
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
const wdth={
    width:'150%'
}
export default Login;