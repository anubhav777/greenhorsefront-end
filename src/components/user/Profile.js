import React, { Component } from 'react';
import axios from 'axios'
import Userprofile from './childclasses/Userprofile'
import Userdetail from './childclasses/Userdetail'
import Adminprofile from './childclasses/Adminprofile';
import token_genrator from '../Miscallenous/Token';
class Profile extends Component {
    state={
        userdata:[],
        question:null,
        file:null,
        imgsrc:"",
        picpath:"",
        admin:true
    }
    componentDidMount(){
        if(token_genrator()){
        let uid=localStorage.getItem('Dejavu')
        let token=token_genrator()
        this.getdata(uid,token)
        this.getquestion(token)
        this.getfile(token)
        this.imageurl()
        }
    }
    getdata=(uid,token)=>{
        
    axios.get(`https://greehorsebackend.herokuapp.com/getuser/${uid}`,{
      headers:{
        'x-access-token':token
      }
    })
    .then(res=>{
 
      this.setState({userdata:res.data,picpath:res.data.picturepath})
      if(res.data.usertype === 'admin'){
          this.setState({admin:true})
      }
    })
    }
    getquestion=(token)=>{
        axios.get('https://greehorsebackend.herokuapp.com/getallquestion/overall',{
            headers:{
              'x-access-token':token
            }})
            .then(res=>{
               
                let new_question = res.data.data.length
                this.setState({question:new_question})
            })
    }
    getfile=(token)=>{
        axios.get('https://greehorsebackend.herokuapp.com/getallfile/overall',{
            headers:{
              'x-access-token':token
            }})
            .then(res=>{
          
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
                            
                        </div>
                        </div>
                    </section>

                    <section className="content">
                        <div className="container-fluid">
                        <div className="row">
                        {this.state.admin ?<Adminprofile  userdata={this.state.userdata} picpath={this.state.picpath}/>:<Userprofile   userdata={this.state.userdata} file={this.state.file} question={this.state.question} picpath={this.state.picpath}/>
                            }
                            
                           

                           
                            <Userdetail/>

                           
                        </div>
                    
                        </div>
                    </section>
                   
                    </div>

        );
    }
}

export default Profile;