import React, { Component } from 'react';

class Tryalluser extends Component {
  componentDidMount(){
    var ip = require("ip");
    let new_ip=ip.mask()
console.log (new_ip )
  }
  render(){
    
        return (
            <div>


                </div>
        );
    }
}

export default Tryalluser;