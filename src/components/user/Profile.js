import React, { Component } from 'react';
import axios from 'axios'
import Userprofile from './childclasses/Userprofile'
import Userdetails from './childclasses/Userdetail'
import Userdetail from './childclasses/Userdetail';
class Profile extends Component {
    state={
        userdata:[],
        question:null,
        file:null,
        imgsrc:""
    }
    componentWillMount(){
        let uid=localStorage.getItem('Dejavu')
        let token=localStorage.getItem('Token')
        this.getdata(uid,token)
        this.getquestion(token)
        this.getfile(token)
        this.imageurl()
    }
    getdata=(uid,token)=>{
        
    axios.get(`http://localhost:5000/getuser/${uid}`,{
      headers:{
        'x-access-token':token
      }
    })
    .then(res=>{
      console.log(res.data)
      this.setState({userdata:res.data})
    })
    }
    getquestion=(token)=>{
        axios.get('http://localhost:5000/getallquestion/overall',{
            headers:{
              'x-access-token':token
            }})
            .then(res=>{
                console.log(res.data)
                let new_question = res.data.data.length
                this.setState({question:new_question})
            })
    }
    getfile=(token)=>{
        axios.get('http://localhost:5000/getallfile/overall',{
            headers:{
              'x-access-token':token
            }})
            .then(res=>{
                console.log(res.data)
                let new_question = res.data.data.length
                this.setState({file:new_question})
            })
    }
    imageurl=()=>{
        var dataImage = localStorage.getItem('Profile');
        
       let new_src = "data:image/png;base64," + dataImage;
       this.setState({imgsrc:new_src})
    }
    render() {
        return (
                    <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <section className="content-header">
                        <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                            <h1>Profile</h1>
                            </div>
                            <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">User Profile</li>
                            </ol>
                            </div>
                        </div>
                        </div>{/* /.container-fluid */}
                    </section>
                    {/* Main content */}
                    <section className="content">
                        <div className="container-fluid">
                        <div className="row">
                            <Userprofile userdata={this.state.userdata} file={this.state.file} question={this.state.question} imgsrc={this.state.imgsrc}/>
                            <Userdetail/>
                            {/* /.col */}
                        </div>
                        {/* /.row */}
                        </div>{/* /.container-fluid */}
                    </section>
                    {/* /.content */}
                    </div>

        );
    }
}

export default Profile;