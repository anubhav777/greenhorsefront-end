import React, { Component } from 'react';
import axios from 'axios'
import {Formik} from 'formik'

class Userdetail extends Component {
    state={
        address:"",
        fullname:"",
        email:"",
        password:"",
        phone:"",
        id:"",
        usertype:"",
        redirect:false,
        disable:true
       

    }
    componentWillMount(){
        this.getdata()
    }
    disable_func=(e)=>{
        this.setState({disable:!this.state.disable})
    }
    getdata=()=>{
        let url=window.location.href
        let splitone=url.split("=",2)
        let newid=splitone[1]
        
        console.log(splitone)
        let token= localStorage.getItem('Token')
        axios.get(`http://localhost:5000/getuser/${newid}`,{
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
            // for (const key of Object.keys[newres]){
            //     console.log(key)

            // }
            // for (const i in keys.length){
            //     console.log(keys[i])
            // }
            for (let i = 0; i < keys.length; i++) {
               this.setState({[keys[i]]:values[i]})
                // console.log(values[i])
            }

            //  console.log(keys[2])
            // this.setState({[res.data]:newres.address})
        })
    }
    updatedata=(e)=>{
        e.preventDefault()
        let token= localStorage.getItem('Token')
        const values={
            "email":this.state.email,
            "address":this.state.address,
            "fullname":this.state.fullname,
            "phone":this.state.phone,
        
        }
        fetch(`http://localhost:5000/updateuser/${this.state.id}`, {
            method: 'PUT',
            headers: {
              
              // 'Accept': 'application/json, text/plain, */*',
              "Content-Type": "application/json",
              'x-access-token':token
              
              
                        },
            body:JSON.stringify(values),
            
            
          })
         .then(re => re.json())
         .then(res =>{
             console.log(res)
             if(res.status === "sucess"){
                 this.setState({redirect:true})
             }
         })
          .catch(error => {
            
            console.log(error)
          })
          

    }
    valuechange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    render() {
        return (
            <div className="col-md-9">
                            <div className="card">
                                <div className="card-header p-2">
                                <ul className="nav nav-pills">
                                   
                                    <li className="nav-item"><a className="nav-link" href="#settings" data-toggle="tab">Profile Update</a></li>
                                </ul>
                                </div>{/* /.card-header */}
                                <div className="card-body">
                                <div className="tab-content">
                                    
                                    {/* /.tab-pane */}
                                    <div className="active tab-pane" id="settings">
                                    <form className="form-horizontal" onSubmit={this.updatedata}>
                                        <div className="form-group row">
                                        <label htmlFor="inputName" className="col-sm-2 col-form-label">UserName</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" placeholder="Username" name="fullname" id="fullname" value={this.state.fullname}
                                      onChange={this.valuechange}
                                     />
                                        </div>
                                        </div>
                                        <div className="form-group row">
                                        <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
                                        <div className="col-sm-10">
                                            <input type="email" className="form-control" placeholder="Email" name="email" id="email" value={this.state.email}
                                      onChange={this.valuechange}/>
                                        </div>
                                        </div>
                                        <div className="form-group row">
                                        <label htmlFor="inputName2" className="col-sm-2 col-form-label">Location</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="inputName2" placeholder="Address" name="address" id="address" value={this.state.address}
                                      onChange={this.valuechange}/>
                                        </div>
                                        </div>
                                        <div className="form-group row">
                                        <label htmlFor="inputExperience" className="col-sm-2 col-form-label">Phone</label>
                                        <div className="col-sm-10">
                                            <textarea className="form-control" id="inputExperience" placeholder="Phone Number" name="phone" id="phone" value={this.state.phone}
                                      onChange={this.valuechange}/>
                                        </div>
                                        </div>
                                       
                                        <div className="form-group row">
                                        <div className="offset-sm-2 col-sm-10">
                                            <div className="checkbox">
                                            <label>
                                                <input type="checkbox" onChange={this.disable_func}/> I agree to the <a href="#">terms and conditions</a>
                                            </label>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="form-group row">
                                        <div className="offset-sm-2 col-sm-10">
                                            <button type="submit"  disabled={this.state.disable ? true : false} className="btn btn-danger">Submit</button>
                                        </div>
                                        </div>
                                    </form>
                                    </div>
                                    {/* /.tab-pane */}
                                </div>
                                {/* /.tab-content */}
                                </div>{/* /.card-body */}
                            </div>
                            {/* /.nav-tabs-custom */}
                            </div>
        );
    }
}

export default Userdetail;