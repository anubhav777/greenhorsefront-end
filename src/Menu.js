import React, { Component } from 'react';
import axios from 'axios'
import {Link,Redirect} from 'react-router-dom'
import token_genrator from './components/Miscallenous/Token'

class Menu extends Component {
  state={
    fullname:"",
    usertype:'',
    picpath:'',
    redirct:false
  }
  componentWillMount(){
   
  }
  componentDidMount(){
    if(token_genrator()){
      // var dataImage = localStorage.getItem('Profile');
      // let bannerImg = document.getElementById('tableBanner');
      let usertype=localStorage.getItem('Usertype')
      this.setState({usertype:usertype})
      // bannerImg.src = "data:image/png;base64," + dataImage;
       
      let uid=localStorage.getItem('Dejavu')
      this.getuser(uid)
    }
    else{
      this.setState({redirct:true})
    }
}
getuser=async (uid)=>{
  let token=localStorage.getItem('Token')
    await axios.get(`https://greehorsebackend.herokuapp.com/getuser/${uid}`,{
      headers:{
        'x-access-token':token
      }
    })
    .then(res=>{
      console.log(res.data)
      this.setState({fullname:res.data.fullname})
      this.setState({picpath:res.data.picturepath})
    })
}
logout=()=>{
  localStorage.clear()
}
    render() {
  if(this.state.redirct){
    return(
      <Redirect to={'/login'}/>
    )
   
  } 
  else{ 
      
        return (
          
<aside className="main-sidebar sidebar-dark-primary elevation-4">

  <Link  to="index3.html" className="brand-link">
    <img src={process.env.PUBLIC_URL + "/arkoray-logo.png"} alt='logo' className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
    <span className="brand-text font-weight-light">Arkoray</span>
  </Link>  
  {/* Sidebar */}
  <div className="sidebar">
    {/* Sidebar user panel (optional) */}
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="image">
        <img src={`https://greenhorse.s3.amazonaws.com/${this.state.picpath}`} alt='profpic' id="tableBanner" style={imgwidth} className="img-circle elevation-2"  />
      </div>
      <div className="info">
        <Link   className="d-block">{this.state.fullname}</Link>  
      </div>
    </div>
    {/* Sidebar Menu */}
    <nav className="mt-2">
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
        <li className="nav-item has-treeview menu-open">
          <Link  className="nav-link">
            <i className="nav-icon fas fa-tachometer-alt" />
            <p>
              Dashboard
              <i className="right fas fa-angle-left" />
            </p>
          </Link>  
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <Link  to="./home" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Home</p>
              </Link>  
            </li>
          </ul>
        </li>
       

        <li className="nav-item has-treeview  menu-open">
          <Link  className="nav-link">
            <i className="nav-icon fas fa-edit" />
            <p>
            Questions
              <i className="fas fa-angle-left right" />
            </p>
          </Link>  
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <Link  to="/upload" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Question Upload</p>
              </Link>  
            </li>
            <li className="nav-item">
              <Link  to="/allquestion" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Uploaded Questions</p>
              </Link>  
            </li>
          </ul>
        </li>
       
        <li className="nav-item has-treeview menu-open">
          <Link   className="nav-link">
            <i className="nav-icon fas fa-book" />
            <p>
              Files
              <i className="fas fa-angle-left right" />
            </p>
          </Link>  
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <Link  to="/fileupload" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>File Upload</p>
              </Link>  
            </li>
            <li className="nav-item">
              <Link  to="/getallfile" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Uploaded File</p>
              </Link>  
            </li>
            <li style={this.state.usertype !== 'admin' ? {display:'none'} : {display:'block'}} className="nav-item">
              <Link  to="/editfile" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Edit File</p>
              </Link>  
            </li>
           
          </ul>
        </li>
        <li className="nav-item has-treeview menu-open">
          <Link  className="nav-link">
            <i className="nav-icon far fa-plus-square" />
            <p>
              Extras
              <i className="fas fa-angle-left right" />
            </p>
          </Link>  
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <Link  to="/profile" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Profile</p>
              </Link>  
            </li>
            <li style={this.state.usertype !== 'admin' ? {display:'none'} : {display:'block'}} className="nav-item">
              <Link  to="/alluser" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>All User</p>
              </Link>  
            </li>
          </ul>
        </li>
        <li className="nav-item has-treeview menu-open">
          <Link onClick={this.logout} to={'/login'} className="nav-link">
            <i className="fas fa-sign-out-alt nav-icon" />
            <p>
              Logout
              
            </p>
          </Link> 
        </li>
      </ul>
    </nav>
    {/* /.sidebar-menu */}
  </div>
  {/* /.sidebar */}
</aside>


          
        );
    }
}
}
const imgwidth={
  width:"2.1rem",
  height:"2.1rem"
}

export default Menu;