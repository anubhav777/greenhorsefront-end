import React, { Component } from 'react';
import axios from 'axios'
import {Formik} from 'formik'
import {Redirect} from 'react-router-dom'
import show_noty from '../Noty/Notify';
import token_genrator from '../Miscallenous/Token';

class Edituser extends Component {
    state={
        address:"",
        fullname:"",
        email:"",
        phone:"",
        id:"",
        usertype:"",
        redirect:false
       

    }
    componentWillMount(){
      if(token_genrator()){
        this.getdata()
      }
        
    }
    getdata=()=>{
        let url=window.location.href
        let splitone=url.split("=",2)
        let newid=splitone[1]
        
        console.log(splitone)
        let token= token_genrator()
        axios.get(`https://greehorsebackend.herokuapp.com/getuser/${newid}`,{
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
        let token= token_genrator()
        const values={
            "email":this.state.email,
            "address":this.state.address,
            "fullname":this.state.fullname,
            "phone":this.state.phone,
            "usertype":this.state.usertype,
          
        }
        fetch(`https://greehorsebackend.herokuapp.com/updateuser/${this.state.id}`, {
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
             console.log(res)
             if(res.status === "success"){
                 this.setState({redirect:true})
                 show_noty('alert',res.noty)
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
        if(this.state.redirect){
            return(
                <Redirect to={'/alluser'}/>
            )
          }
          else{
        return (
<div className="content-wrapper">
  {/* Content Header (Page header) */}
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1 style={ml}>User Form</h1>
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
       
          {/* /.card */}
          {/* Input addon */}
          <form onSubmit={this.updatedata}>
          <div className="card card-info">
            <div className="card-header">
              <h3 className="card-title">Update User Form</h3>
            </div>
            <div className="card-body">
            <label for="exampleInputEmail1">UserName</label>
              <div className="input-group mb-3">
                  
                <div className="input-group-prepend">
               
                </div>
                <input type="text" className="form-control" placeholder="Username" name="fullname" id="fullname" value={this.state.fullname}
                                      onChange={this.valuechange}
                                     />
              </div>
              <label for="exampleInputEmail1">Email address</label>
              <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Email" name="email" id="email" value={this.state.email}
                                      onChange={this.valuechange}/>
                <div className="input-group-append">
                 
                </div>
              </div>
              <label for="exampleInputEmail1">Address</label>
              <div className="input-group mb-3">
                  
                <div className="input-group-prepend">
               
                </div>
                <input type="text" className="form-control" placeholder="Address" name="address" id="address" value={this.state.address}
                                      onChange={this.valuechange}/>
              </div>
              <label for="exampleInputEmail1">Phone</label>
              <div className="input-group mb-3">
                  
                <div className="input-group-prepend">
               
                </div>
                <input type="text" className="form-control" placeholder="Phone Number" name="phone" id="phone" value={this.state.phone}
                                      onChange={this.valuechange}/>
              </div>
            <div className="col-sm-6">
                    <div className="form-group">
                        <label>User-Type</label>
                        <select className="form-control" name="usertype" onchange={this.valuechange}>
                        <option selected={this.state.usertype === "admin"?true:false} value="admin">Admin</option>
                         <option selected={this.state.usertype === "staff"?true:false} value="staff">Staff</option>
                        </select>
                    </div>
                    </div>

           
     
              <div class="card-footer">
                  <button type="submit" class="btn btn-info">Update</button>
                  
                </div>
              {/* /input-group */}
            </div>
            {/* /.card-body */}
          </div>
          {/* /.card */}
          {/* Horizontal Form */}
          </form>
          
          {/* /.card */}
        </div>
        {/*/.col (right) */}
      </div>
      {/* /.row */}
    </div>{/* /.container-fluid */}
  </section>
  {/* /.content */}
</div>

        );
    }
}
}
const ml={
    marginLeft:'20%'
}

export default Edituser;