import React, { Component } from 'react';
import propTypes from 'prop-types'

class Adminprofile extends Component {
    state={
        obj:{}
    }
    componentWillMount(){
        console.log(this.props.userdata)
        this.setState({obj:this.props.userdata})
      
    }
    componentDidMount(){
        let bann = document.getElementById('tableB');
        let imgsrc=this.props.imgsrc
        console.log(this.props.imgsrc)
        bann.src = imgsrc ;
    }
    
    render() {
        return (
            <div className="col-md-3">
                            {/* Profile Image */}
                            <div className="card card-primary card-outline">
                                <div className="card-body box-profile">
                                <div className="text-center">
                                <img id="tableB" src='' style={imgwdth} classname="profile-user-img img-fluid img-circle"  />

                                </div>
                                <h3 className="profile-username text-center">{this.props.userdata.fullname}</h3>
                                <p className="text-muted text-center">{this.props.userdata.usertype}</p>
                                <ul className="list-group list-group-unbordered mb-3">
                                <div className="card-body">
                                <strong><i className="fas fa-book mr-1" /> Email Address</strong>
                                <p className="text-muted">
                                  {this.props.userdata.email}
                                </p>
                                <hr />
                                <strong><i className="fas fa-map-marker-alt mr-1" /> Location</strong>
                                <p className="text-muted">{this.props.userdata.address}</p>
                                <hr />
                                <strong><i className="fas fa-pencil-alt mr-1" /> Phone Number</strong>
                                <p className="text-muted">
                                    {this.props.userdata.phone}
                                    
                                </p>
                                <hr />
                           
                                </div>
                                </ul>
                                {/* /.card-body */}
                            </div>
                            </div>
                            {/* /.card */}
                            {/* About Me Box */}
                          
                            {/* /.card */}
                            </div>
        );
    }
}
Adminprofile.propTypes={
    userdata:propTypes.object.isRequired,
    question:propTypes.number.isRequired,
    file:propTypes.number.isRequired,
    imgsrc:propTypes.string.isRequired
}
const imgwdth={
    width:'128px',
    height:'128px',
    borderRadius: '50%',
    border: '3px solid #adb5bd',
    margin: '0 auto',
    padding: '3px',
    verticalAlign: 'middle',
    textAlign: 'center'


}

export default Adminprofile;