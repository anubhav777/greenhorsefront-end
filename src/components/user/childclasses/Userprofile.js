import React, { Component } from 'react';
import propTypes from 'prop-types'

class Userprofile extends Component {
    state={
        obj:{}
    }
    componentWillMount(){
        
        this.setState({obj:this.props.userdata})
      
    }
    componentDidMount(){
       
    }
    render() {
        return (
            <div className="col-md-3">
                            {/* Profile Image */}
                            <div className="card card-primary card-outline">
                                <div className="card-body box-profile">
                                <div className="text-center">
                                    <img src={`https://greenhorse.s3.amazonaws.com/${this.props.picpath}`} alt='progpic' style={imgwdth} classname="profile-user-img img-fluid img-circle"  />

                                </div>
                                <h3 className="profile-username text-center">{this.props.userdata.fullname}</h3>
                                <p className="text-muted text-center">{this.props.userdata.usertype}</p>
                                <ul className="list-group list-group-unbordered mb-3">
                                    <li className="list-group-item">
        <b>Questions Uploaded</b> <span className="float-right">{this.props.question}</span>
                                    </li>
                                    <li className="list-group-item">
        <b>Files Uploaded</b> <span className="float-right">{this.props.file}</span>
                                    </li>
                                </ul>
                               
                                </div>
                                {/* /.card-body */}
                            </div>
                            {/* /.card */}
                            {/* About Me Box */}
                            <div className="card card-primary">
                                <div className="card-header">
                                <h3 className="card-title">About Me</h3>
                                </div>
                                {/* /.card-header */}
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
                                {/* /.card-body */}
                            </div>
                            {/* /.card */}
                            </div>
        );
    }
}
Userprofile.propTypes={
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

export default Userprofile;