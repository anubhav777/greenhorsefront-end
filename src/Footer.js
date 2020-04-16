import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
     <footer syle={ml} className="main-footer">
  <strong>Copyright © 2020-2015<a href="http://adminlte.io">Arkoray</a>.</strong>
  All rights reserved.
  <div className="float-right d-none d-sm-inline-block">
    <b>Version</b> 0.0.1
  </div>
</footer>


        );
    }
}
const ml={
    height:'50px'
}
export default Footer;