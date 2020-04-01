import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Header from './Header'
import Menu from './Menu'
import Footer from './Footer'
import Table from './Table'
import Login from './components/user/Login'
import Signup from './components/user/signup'
import Uploadquestion from './components/questions/Uploadquestion'
import Alluser from './components/user/Alluser'
import Edituser from './components/user/Edituser'
import Fileupload from './components/Files/Fileupload'
import Allfile from './components/Files/Allfile'

// import './App.css';
// import './css/main.css'
// import './css/style2.css'
import '../node_modules/noty/lib/noty.css'
import '../node_modules/noty/lib/themes/mint.css'
import Allquestion from './components/questions/Allquestion'
class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route exact path="/" render={(props)=>(
            <React.Fragment>
              <Signup/>
            </React.Fragment>
          )}>

          </Route>
        
        <Switch>
          <Route path='/login'><Login/></Route>

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
        </Switch>
        
        </Router>
      </div>
    );
  }
}

export default App;