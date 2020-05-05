import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Header from './Header'
import Menu from './Menu'
import Footer from './Footer'
import './App.css'
import Login from './components/user/Login'
import Signup from './components/user/signup'
import Uploadquestion from './components/questions/Uploadquestion'
import Alluser from './components/user/Alluser'
import Edituser from './components/user/Edituser'
import Fileupload from './components/Files/Fileupload'
import Allfile from './components/Files/Allfile'
import Editfile from './components/Files/Editfile'
import Resetpassword from './components/user/Resetpassword'
import Confirmpassword from './components/user/Confirmpassword'
import Verifier from './components/user/Verifier'

import Profile from './components/user/Profile'

import Dashboard from './components/Graphs/Dashboard'

import '../node_modules/noty/lib/noty.css'
import '../node_modules/noty/lib/themes/mint.css'
import Allquestion from './components/questions/Allquestion'
import Dashtable from './components/Graphs/Dashtable';
// import Userinsight from './components/Files/Userinsight'


class App extends Component {
  render() {
    return (
    
        <Router>
          <Route exact path="/" render={(props)=>(
            <React.Fragment>
              <Signup/>
            </React.Fragment>
          )}>

          </Route>
        
        <Switch>
          <Route path='/login'><Login/></Route>
          <Route path='/reset'><Resetpassword/></Route>
          <Route path='/confirm'><Confirmpassword/></Route>
          <Route path='/verifier'><Verifier/></Route>
          

          <Route path='/allquestion' render={(props)=>(
            <React.Fragment>
              <Header/>
              <Menu/>
              <Allquestion/>
            
            </React.Fragment>
          )}></Route>
          
          <Route exact path='/upload' render={(props)=>(
            <React.Fragment>
              <Header/>
              <Menu/>
              <Uploadquestion/>
              
            </React.Fragment>
          )}></Route>
          <Route exact path='/alluser' render={(props)=>(
            <React.Fragment>
              <Header/>
              <Menu/>
              <Alluser/>
              
            </React.Fragment>
          )}>

          </Route>
          <Route exact path='/edituser' render={(props)=>(
            <React.Fragment>
                <Header/>
              <Menu/>
              <Edituser/>
              
            </React.Fragment>
          )}>

          </Route>
          <Route exact path='/fileupload' render={(props)=>(
            <React.Fragment>
                <Header/>
                <Menu/>
              <Fileupload/>
            
            </React.Fragment>
          )}>

          </Route>
          <Route exact path='/getallfile' render={(props)=>(
            <React.Fragment>
              <Header/>
              <Menu/>
              <Allfile/>
             
            </React.Fragment>
          )}>

          </Route>
          <Route exact path='/editfile' render={(props)=>(
            <React.Fragment>
              <Header/>
              <Menu/>
              <Editfile/>
             
            </React.Fragment>
          )}>

          </Route>
          <Route exact path='/profile' render={(props)=>(
            <React.Fragment>
              <Header/>
                <Menu/>
                <Profile/>
              
            
            </React.Fragment>
          )}>

          </Route>
          <Route  path='/home' render={(props) =>(
            <React.Fragment>
              <Header/>
              <Menu/>
              <Dashboard/>
              <Footer/>
            </React.Fragment>
          )}>

          </Route>
          <Route exact path='/dashtab' render={(props)=>(
            <React.Fragment>
              <Header/>
              <Menu/>
              <Dashtable/>
              
            </React.Fragment>
          )}>

          </Route>
          {/* <Route exact path ='/userinsight' render={(props)=>(
            <React.Fragment>
              <Header/>
              <Menu/>
              <Userinsight/>
              
            </React.Fragment>
          )}>

          </Route> */}
       
        </Switch>
        
        </Router>
     
    );
  }
}

export default App;