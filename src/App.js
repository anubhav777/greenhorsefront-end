import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Header from './Header'
import Menu from './Menu'
import Footer from './Footer'

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
import Try from './components/questions/Try'
import Tryimage from './components/user/Tryimage'
import Trypicture from './components/user/Trypicture'
import Profile from './components/user/Profile'
import Tryfile from './components/Files/Tryfile'

import Tryalluser from './components/user/Tryalluser'
import Dashboard from './components/Graphs/Dashboard'

import Newcalendar from './components/Graphs/Newcalendar'


// import './App.css';
// import './css/main.css'
// import './css/style2.css'
import '../node_modules/noty/lib/noty.css'
import '../node_modules/noty/lib/themes/mint.css'
import Allquestion from './components/questions/Allquestion'
import Dashtable from './components/Graphs/Dashtable';
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
          <Route path='/tryimg'><Tryimage/></Route>
          <Route path='/pics'><Trypicture/></Route>
          <Route path='/tryalluser'><Tryalluser/></Route>
          <Route path='/calendar'><Newcalendar/></Route>

          <Route path='/allquestion' render={(props)=>(
            <React.Fragment>
              <Header/>
              <Menu/>
              <Allquestion/>
              <Footer/>
            </React.Fragment>
          )}></Route>
          
          <Route exact path='/upload' render={(props)=>(
            <React.Fragment>
              <Header/>
              <Menu/>
              <Uploadquestion/>
              <Footer/>
            </React.Fragment>
          )}></Route>
          <Route exact path='/alluser' render={(props)=>(
            <React.Fragment>
              <Header/>
              <Menu/>
              <Alluser/>
              <Footer/>
            </React.Fragment>
          )}>

          </Route>
          <Route exact path='/edituser' render={(props)=>(
            <React.Fragment>
                <Header/>
              <Menu/>
              <Edituser/>
              <Footer/>
            </React.Fragment>
          )}>

          </Route>
          <Route exact path='/fileupload' render={(props)=>(
            <React.Fragment>
                <Header/>
                <Menu/>
              <Fileupload/>
              <Footer/>
            </React.Fragment>
          )}>

          </Route>
          <Route exact path='/getallfile' render={(props)=>(
            <React.Fragment>
              <Header/>
              <Menu/>
              <Allfile/>
              <Footer/>
            </React.Fragment>
          )}>

          </Route>
          <Route exact path='/editfile' render={(props)=>(
            <React.Fragment>
              <Header/>
              <Menu/>
              <Editfile/>
              <Footer/>
            </React.Fragment>
          )}>

          </Route>
          <Route exact path='/try' render={(props)=>(
            <React.Fragment>
              <Header/>
              <Menu/>
              <Try/>
              <Footer/>
            </React.Fragment>
          )}>

          </Route>
          <Route exact path='/profile' render={(props)=>(
            <React.Fragment>
              <Header/>
                <Menu/>
                <Profile/>
                <Footer/>
            
            </React.Fragment>
          )}>

          </Route>
          <Route exact path='/tryfile' render={(props)=>(
            <React.Fragment>
              <Header/>
              <Menu/>
              <Tryfile/>
              <Footer/>
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
              <Footer/>
            </React.Fragment>
          )}>

          </Route>
       
        </Switch>
        
        </Router>
     
    );
  }
}

export default App;