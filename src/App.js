import React, { Component } from 'react';
import Header from './Header'
import Menu from './Menu'
import Footer from './Footer'
import Table from './Table'
import Login from './components/user/Login'
import Signup from './components/user/signup'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
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
        </Switch>
        
        </Router>
      </div>
    );
  }
}

export default App;