import React, { Component } from 'react';
import Axios from 'axios';
import {Redirect} from 'react-router-dom'

class Verifier extends Component {
    state={
        redirect:false
    }
    componentWillMount(){
        this.verified()
    }
    verified=()=>{
        let url=window.location.href
        let new_split=url.split("=",2)
        let tok=new_split[1]
        console.log(tok)
        Axios.get(`https://greehorsebackend.herokuapp.com/confirmverification/${tok}`)
        .then(res=>{
            console.log(res.data)
            this.setState({redirect:true})
        })
    }
    render() {
        if(this.state.redirect){
            return(
                <Redirect to={'/login'}/>
            )
          }
          else{
        return (
<div className="content" >
  <div className="container-fluid">
    <div className="row">
      
      {/* /.col-md-6 */}
      <div className="col-lg-6" style={stl}>
        <div className="card">
          <div className="card-header">
            <h5 className="m-0">Verification</h5>
          </div>
          <div className="card-body">
            <h6 className="card-title">Account Verification</h6>
            <p className="card-text">Your account is beig Verified . You, will be redirected to Login page once the process is complete.....Thank you for your Patience!!!!!</p>
            
          </div>
        </div>
      </div>
      {/* /.col-md-6 */}
    </div>
    {/* /.row */}
  </div>{/* /.container-fluid */}
</div>


        );
    }
}
}
const stl={
    margin : '0 auto',
    marginTop:'15%'
}
export default Verifier;