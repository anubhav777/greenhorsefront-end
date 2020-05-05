import React, { Component } from 'react';
import Headertab from './childclasses/Headertab'
import Tables from './childclasses/Tables'
import Maingraph from './Maingraph'
import token_genrator from '../Miscallenous/Token'
class Dashboard extends Component {
  state={
    usertype:''
  }
    UNSAFE_componentWillMount(){
      if(token_genrator()){
        
        let usertype=localStorage.getItem('Usertype')
        this.setState({usertype:usertype})
      }
    }
    render() {
        return (
<div className="content-wrapper">
  {/* Content Header (Page header) */}
  <div className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1 className="m-0 text-dark">Dashboard v2</h1>
        </div>{/* /.col */}
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="/home">Home</a></li>
        <li style={this.state.usertype !== 'admin' ? {display:'none'} : {display:'list-item'}} className="breadcrumb-item active"><a href="/dashtab">Dashboard v2</a></li>
          </ol>
        </div>
      </div>
    </div>
  </div>
  <section className="content">
            <div className="container-fluid">
            <Headertab token={token_genrator()}/>
      <Maingraph  token={token_genrator()}/>
    <Tables  token={token_genrator()}/>
    </div>
    </section>
</div>


        );
    }
}

export default Dashboard;